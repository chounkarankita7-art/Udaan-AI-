import { Router } from "express";
import { randomUUID } from "crypto";
import { devStore, ensureDevSeedData } from "../lib/dev-store";

const router = Router();

router.get("/progress/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!process.env.DATABASE_URL) {
      ensureDevSeedData();
      const progress = devStore.progress.filter(p => p.studentId === studentId);
      const allCourses = devStore.courses;

      const courseProgress = allCourses.map(course => {
        const courseP = progress.filter(p => p.courseId === course.id);
        const completed = courseP.filter(p => p.completed).length;
        const total = course.totalLectures || 1;
        const lastAccessed = courseP.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
        return {
          courseId: course.id,
          courseName: course.title,
          progress: Math.round((completed / total) * 100),
          completedLectures: completed,
          totalLectures: total,
          lastAccessedAt: lastAccessed?.updatedAt?.toISOString(),
        };
      }).filter(c => c.completedLectures > 0 || Math.random() > 0.5);

      const overallProgress = courseProgress.length > 0
        ? Math.round(courseProgress.reduce((sum, c) => sum + c.progress, 0) / courseProgress.length)
        : 0;

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const monthlyData = months.map((month, i) => ({
        month,
        hoursStudied: Math.round((2 + i * 0.5 + Math.random()) * 10) / 10,
        lecturesCompleted: Math.floor(3 + i * 2 + Math.random() * 3),
      }));

      return res.json({ overallProgress, courseProgress, monthlyData });
    }

    const { db, studentProgressTable, coursesTable } = await import("@workspace/db");
    const { eq } = await import("drizzle-orm");
    const progress = await db.select().from(studentProgressTable).where(eq(studentProgressTable.studentId, studentId));
    const allCourses = await db.select().from(coursesTable);

    const courseProgress = allCourses.map(course => {
      const courseP = progress.filter(p => p.courseId === course.id);
      const completed = courseP.filter(p => p.completed).length;
      const total = course.totalLectures || 1;
      const lastAccessed = courseP.sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime())[0];
      return {
        courseId: course.id,
        courseName: course.title,
        progress: Math.round((completed / total) * 100),
        completedLectures: completed,
        totalLectures: total,
        lastAccessedAt: lastAccessed?.updatedAt?.toISOString(),
      };
    }).filter(c => c.completedLectures > 0 || Math.random() > 0.5);

    const overallProgress = courseProgress.length > 0
      ? Math.round(courseProgress.reduce((sum, c) => sum + c.progress, 0) / courseProgress.length)
      : 0;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const monthlyData = months.map((month, i) => ({
      month,
      hoursStudied: Math.round((2 + i * 0.5 + Math.random()) * 10) / 10,
      lecturesCompleted: Math.floor(3 + i * 2 + Math.random() * 3),
    }));

    return res.json({ overallProgress, courseProgress, monthlyData });
  } catch (err) {
    req.log.error({ err }, "Get progress error");
    return res.status(500).json({ error: "Failed to get progress" });
  }
});

router.patch("/progress/:studentId/course/:courseId", async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const { lectureId, completed, progress } = req.body;

    if (!process.env.DATABASE_URL) {
      ensureDevSeedData();
      const existing = devStore.progress.find(p => p.studentId === studentId && p.courseId === courseId && p.lectureId === lectureId);
      if (existing) {
        existing.completed = completed ?? existing.completed;
        existing.progress = progress ?? existing.progress;
        existing.updatedAt = new Date();
      } else {
        devStore.progress.push({
          id: randomUUID(),
          studentId,
          courseId,
          lectureId,
          completed: completed ?? false,
          progress: progress ?? 0,
          updatedAt: new Date(),
        });
      }

      const allProgress = devStore.progress.filter(p => p.studentId === studentId && p.courseId === courseId);
      const completedCount = allProgress.filter(p => p.completed).length;
      const course = devStore.courses.find(c => c.id === courseId);
      const total = course?.totalLectures || 1;

      return res.json({
        courseId,
        courseName: course?.title || "Course",
        progress: Math.round((completedCount / total) * 100),
        completedLectures: completedCount,
        totalLectures: total,
      });
    }

    const { db, studentProgressTable, coursesTable } = await import("@workspace/db");
    const { eq, and } = await import("drizzle-orm");
    const existing = await db.select().from(studentProgressTable)
      .where(and(
        eq(studentProgressTable.studentId, studentId),
        eq(studentProgressTable.courseId, courseId),
        eq(studentProgressTable.lectureId, lectureId),
      )).limit(1);

    if (existing.length > 0) {
      await db.update(studentProgressTable).set({
        completed: completed ?? existing[0].completed,
        progress: progress ?? existing[0].progress,
        updatedAt: new Date(),
      }).where(eq(studentProgressTable.id, existing[0].id)).returning();
    } else {
      await db.insert(studentProgressTable).values({
        id: randomUUID(),
        studentId,
        courseId,
        lectureId,
        completed: completed ?? false,
        progress: progress ?? 0,
      }).returning();
    }

    const allProgress = await db.select().from(studentProgressTable)
      .where(and(eq(studentProgressTable.studentId, studentId), eq(studentProgressTable.courseId, courseId)));
    const completedCount = allProgress.filter(p => p.completed).length;
    const courses = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1);
    const total = courses[0]?.totalLectures || 1;

    return res.json({
      courseId,
      courseName: courses[0]?.title || "Course",
      progress: Math.round((completedCount / total) * 100),
      completedLectures: completedCount,
      totalLectures: total,
    });
  } catch (err) {
    req.log.error({ err }, "Update progress error");
    return res.status(500).json({ error: "Failed to update progress" });
  }
});

router.post("/progress/:studentId/activity", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { type, description } = req.body;
    
    if (!process.env.DATABASE_URL) {
      const student = devStore.studentsById.get(studentId);
      if (student) {
        student.totalPoints = (student.totalPoints || 350) + 10;
        // Simple streak logic mock
        student.streak = (student.streak || 5) + 1;
      }
      return res.json({ success: true, message: "Activity logged" });
    }

    // Would add DB logic here for real db
    return res.json({ success: true, message: "Activity logged" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to log activity "});
  }
});

// POST /api/progress/complete-phase - Complete a phase and unlock next phase
router.post("/progress/complete-phase", async (req, res) => {
  try {
    const { userId, skillId, level, phaseNumber, score, passed } = req.body;

    if (!userId || !skillId || !level || phaseNumber === undefined || score === undefined || passed === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!process.env.DATABASE_URL) {
      // Dev mode: store in memory
      ensureDevSeedData();
      
      // Update or insert phase completion
      const existingIndex = devStore.userProgress.findIndex(
        p => p.userId === userId && p.skillId === skillId && p.level === level && p.phaseNumber === phaseNumber
      );
      
      if (existingIndex >= 0) {
        devStore.userProgress[existingIndex] = {
          ...devStore.userProgress[existingIndex],
          status: 'completed',
          score: score,
          completedAt: new Date(),
          updatedAt: new Date(),
        };
      } else {
        devStore.userProgress.push({
          id: randomUUID(),
          userId,
          skillId,
          level,
          phaseNumber,
          status: 'completed',
          score: score,
          completedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Unlock next phase if passed
      if (passed) {
        const nextPhaseIndex = devStore.userProgress.findIndex(
          p => p.userId === userId && p.skillId === skillId && p.level === level && p.phaseNumber === phaseNumber + 1
        );
        
        if (nextPhaseIndex >= 0) {
          devStore.userProgress[nextPhaseIndex] = {
            ...devStore.userProgress[nextPhaseIndex],
            status: 'unlocked',
            updatedAt: new Date(),
          };
        } else {
          devStore.userProgress.push({
            id: randomUUID(),
            userId,
            skillId,
            level,
            phaseNumber: phaseNumber + 1,
            status: 'unlocked',
            score: 0,
            completedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      return res.json({ success: true, message: "Phase completed and next phase unlocked" });
    }

    // Production mode: use database
    const { db, skillProgressTable } = await import("@workspace/db");
    const { eq, and } = await import("drizzle-orm");

    // Update or insert phase completion
    const existing = await db.select().from(skillProgressTable)
      .where(and(
        eq(skillProgressTable.userId, userId),
        eq(skillProgressTable.skillId, skillId),
        eq(skillProgressTable.level, level),
        eq(skillProgressTable.phaseNumber, phaseNumber)
      )).limit(1);

    if (existing.length > 0) {
      await db.update(skillProgressTable).set({
        status: 'completed',
        score: score,
        completedAt: new Date(),
      }).where(eq(skillProgressTable.id, existing[0].id));
    } else {
      await db.insert(skillProgressTable).values({
        id: randomUUID(),
        userId,
        skillId,
        level,
        phaseNumber,
        status: 'completed',
        score: score,
        completedAt: new Date(),
      });
    }

    // Unlock next phase if passed
    if (passed) {
      const nextPhase = await db.select().from(skillProgressTable)
        .where(and(
          eq(skillProgressTable.userId, userId),
          eq(skillProgressTable.skillId, skillId),
          eq(skillProgressTable.level, level),
          eq(skillProgressTable.phaseNumber, phaseNumber + 1)
        )).limit(1);

      if (nextPhase.length > 0) {
        await db.update(skillProgressTable).set({
          status: 'unlocked',
        }).where(eq(skillProgressTable.id, nextPhase[0].id));
      } else {
        await db.insert(skillProgressTable).values({
          id: randomUUID(),
          userId,
          skillId,
          level,
          phaseNumber: phaseNumber + 1,
          status: 'unlocked',
          score: 0,
          completedAt: null,
        });
      }
    }

    return res.json({ success: true, message: "Phase completed and next phase unlocked" });
  } catch (err) {
    console.error("Complete phase error:", err);
    return res.status(500).json({ error: "Failed to complete phase" });
  }
});

// GET /api/progress/:userId/:skillId/:level - Get progress for a specific skill and level
router.get("/progress/:userId/:skillId/:level", async (req, res) => {
  try {
    const { userId, skillId, level } = req.params;

    if (!process.env.DATABASE_URL) {
      // Dev mode: read from memory
      ensureDevSeedData();
      const progress = devStore.userProgress.filter(
        p => p.userId === userId && p.skillId === skillId && p.level === level
      );
      
      return res.json({ progress });
    }

    // Production mode: use database
    const { db, skillProgressTable } = await import("@workspace/db");
    const { eq, and } = await import("drizzle-orm");

    const progress = await db.select().from(skillProgressTable)
      .where(and(
        eq(skillProgressTable.userId, userId),
        eq(skillProgressTable.skillId, skillId),
        eq(skillProgressTable.level, level)
      ));

    return res.json({ progress });
  } catch (err) {
    console.error("Get progress error:", err);
    return res.status(500).json({ error: "Failed to get progress" });
  }
});

export default router;
