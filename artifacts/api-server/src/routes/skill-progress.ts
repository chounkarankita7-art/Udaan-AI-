import { Router } from "express";
import { randomUUID } from "crypto";
import { devStore, DevUserProgress, DevUserTestResult } from "../lib/dev-store";

const router = Router();

// Save test result
router.post("/test-results/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { skillId, testType, score, passed, phaseNumber, level } = req.body;

    if (!process.env.DATABASE_URL) {
      const testResult: DevUserTestResult = {
        id: randomUUID(),
        userId,
        skillId,
        testType,
        score,
        passed,
        takenAt: new Date(),
        phaseNumber: phaseNumber ?? null,
        level: level ?? null,
      };
      devStore.userTestResults.push(testResult);

      // If test passed, update phase/level status
      if (passed) {
        if (testType === "phase" && phaseNumber) {
          // Mark current phase as completed
          const currentPhaseIndex = devStore.userProgress.findIndex(
            p => p.userId === userId && p.skillId === skillId && p.phaseNumber === phaseNumber
          );
          if (currentPhaseIndex !== -1) {
            devStore.userProgress[currentPhaseIndex].status = "completed";
            devStore.userProgress[currentPhaseIndex].completedAt = new Date();
            devStore.userProgress[currentPhaseIndex].updatedAt = new Date();
          }

          // Unlock next phase
          const nextPhaseNumber = phaseNumber + 1;
          const nextPhaseIndex = devStore.userProgress.findIndex(
            p => p.userId === userId && p.skillId === skillId && p.phaseNumber === nextPhaseNumber
          );
          if (nextPhaseIndex !== -1) {
            devStore.userProgress[nextPhaseIndex].status = "unlocked";
            devStore.userProgress[nextPhaseIndex].updatedAt = new Date();
          }
        } else if (testType === "level" && level) {
          // Mark level as completed and unlock next level
          const levelProgress = devStore.userProgress.filter(
            p => p.userId === userId && p.skillId === skillId && p.level === level
          );
          levelProgress.forEach(p => {
            p.status = "completed";
            p.completedAt = new Date();
            p.updatedAt = new Date();
          });

          // Unlock next level
          const levels: Array<"beginner" | "intermediate" | "advanced"> = ["beginner", "intermediate", "advanced"];
          const currentLevelIndex = levels.indexOf(level as any);
          if (currentLevelIndex !== -1 && currentLevelIndex < levels.length - 1) {
            const nextLevel = levels[currentLevelIndex + 1];
            const nextLevelProgress = devStore.userProgress.filter(
              p => p.userId === userId && p.skillId === skillId && p.level === nextLevel
            );
            nextLevelProgress.forEach(p => {
              p.status = "unlocked";
              p.updatedAt = new Date();
            });
          }
        }
      }

      return res.json({ success: true, testResult });
    }

    // Database implementation would go here
    return res.json({ success: true, message: "Test result saved" });
  } catch (err) {
    req.log?.error({ err }, "Save test result error");
    return res.status(500).json({ error: "Failed to save test result" });
  }
});

// Get user progress for a skill
router.get("/progress/:userId/:skillId", async (req, res) => {
  try {
    const { userId, skillId } = req.params;

    if (!process.env.DATABASE_URL) {
      const progress = devStore.userProgress.filter(p => p.userId === userId && p.skillId === skillId);
      return res.json({ progress });
    }

    // Database implementation would go here
    return res.json({ progress: [] });
  } catch (err) {
    req.log?.error({ err }, "Get progress error");
    return res.status(500).json({ error: "Failed to get progress" });
  }
});

// Update phase status
router.patch("/progress/:userId/:skillId/:phaseNumber", async (req, res) => {
  try {
    const { userId, skillId, phaseNumber } = req.params;
    const { status, level } = req.body;

    if (!process.env.DATABASE_URL) {
      const phaseNum = parseInt(phaseNumber);
      const existingIndex = devStore.userProgress.findIndex(
        p => p.userId === userId && p.skillId === skillId && p.phaseNumber === phaseNum
      );

      if (existingIndex !== -1) {
        devStore.userProgress[existingIndex].status = status;
        devStore.userProgress[existingIndex].updatedAt = new Date();
        if (status === "completed") {
          devStore.userProgress[existingIndex].completedAt = new Date();
        }
      } else {
        const newProgress: DevUserProgress = {
          id: randomUUID(),
          userId,
          skillId,
          level: level || "beginner",
          phaseNumber: phaseNum,
          status,
          completedAt: status === "completed" ? new Date() : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        devStore.userProgress.push(newProgress);
      }

      return res.json({ success: true });
    }

    // Database implementation would go here
    return res.json({ success: true });
  } catch (err) {
    req.log?.error({ err }, "Update progress error");
    return res.status(500).json({ error: "Failed to update progress" });
  }
});

// Initialize skill progress for a user
router.post("/initialize/:userId/:skillId", async (req, res) => {
  try {
    const { userId, skillId } = req.params;

    if (!process.env.DATABASE_URL) {
      // Check if progress already exists
      const existing = devStore.userProgress.filter(p => p.userId === userId && p.skillId === skillId);
      if (existing.length > 0) {
        return res.json({ success: true, message: "Progress already initialized" });
      }

      // Initialize progress for all levels and phases
      const levels: Array<"beginner" | "intermediate" | "advanced"> = ["beginner", "intermediate", "advanced"];
      const phasesPerLevel = 4;

      levels.forEach((level, levelIndex) => {
        for (let phase = 1; phase <= phasesPerLevel; phase++) {
          const status = levelIndex === 0 && phase === 1 ? "unlocked" : "locked";
          const newProgress: DevUserProgress = {
            id: randomUUID(),
            userId,
            skillId,
            level,
            phaseNumber: phase,
            status,
            completedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          devStore.userProgress.push(newProgress);
        }
      });

      return res.json({ success: true, message: "Progress initialized" });
    }

    // Database implementation would go here
    return res.json({ success: true });
  } catch (err) {
    req.log?.error({ err }, "Initialize progress error");
    return res.status(500).json({ error: "Failed to initialize progress" });
  }
});

export default router;
