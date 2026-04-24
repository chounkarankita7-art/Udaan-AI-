const KEYS = {
  roadmap: 'udaan_roadmap',
  progress: 'udaan_progress',
  assessment: 'udaan_assessment',
  user: 'udaan_user'
}

export const Storage = {
  saveRoadmap: (data: any) => {
    localStorage.setItem(KEYS.roadmap, 
      JSON.stringify(data))
  },
  getRoadmap: () => {
    const data = localStorage.getItem(KEYS.roadmap)
    return data ? JSON.parse(data) : null
  },
  saveProgress: (skillId: string, level: string, 
    phaseNumber: number, data: any) => {
    const key = KEYS.progress + '_' + 
      skillId + '_' + level
    const existing = JSON.parse(
      localStorage.getItem(key) || '{}')
    existing[phaseNumber] = data
    localStorage.setItem(key, JSON.stringify(existing))
  },
  getProgress: (skillId: string, level: string) => {
    const key = KEYS.progress + '_' + 
      skillId + '_' + level
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : {}
  },
  saveAssessment: (answers: any) => {
    localStorage.setItem(KEYS.assessment,
      JSON.stringify(answers))
  },
  getAssessment: () => {
    const data = localStorage.getItem(KEYS.assessment)
    return data ? JSON.parse(data) : null
  },
  clearAll: () => {
    Object.values(KEYS).forEach(key => 
      localStorage.removeItem(key))
  }
}
