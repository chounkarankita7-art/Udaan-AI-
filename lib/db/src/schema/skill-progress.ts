import { pgTable, text, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";

export const skillProgressTable = pgTable("skill_progress", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  skillId: text("skill_id").notNull(),
  level: text("level").notNull(),
  phaseNumber: integer("phase_number").notNull(),
  status: text("status").notNull().default("locked"),
  score: integer("score").default(0),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SkillProgress = typeof skillProgressTable.$inferSelect;
