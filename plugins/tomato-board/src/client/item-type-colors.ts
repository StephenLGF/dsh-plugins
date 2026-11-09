const TYPE_TONES: Record<string, string> = {
  Story: '#2f7d72', EnablerStory: '#2777a8', Task: '#7b61a8', 跟踪任务: '#a14f78', Bug: '#c34f43', 缺陷: '#c34f43', 测试缺陷: '#d06438', Epic: '#9a6b24', Feature: '#3f68ad',
}
export function typeTone(type: string): string {
  if (TYPE_TONES[type]) return TYPE_TONES[type]
  const palette = ['#2f7d72', '#2777a8', '#7b61a8', '#c34f43', '#9a6b24', '#51753a', '#a14f78']
  return palette[[...type].reduce((hash, char) => hash + char.charCodeAt(0), 0) % palette.length]!
}
