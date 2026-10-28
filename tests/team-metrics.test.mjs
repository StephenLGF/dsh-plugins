import assert from 'node:assert/strict'
import test from 'node:test'
import { teamDate, teamPeriod, teamItemMetrics } from '../plugins/tomato-board/src/team-metrics.ts'

const period = { start: '2026-10-26', end: '2026-11-01' }
test('uses Shanghai calendar dates and refuses missing or reversed iteration dates', () => {
  assert.equal(teamDate('2026-10-25T16:00:00.000Z'), '2026-10-26')
  assert.equal(teamDate('2026-11-01T15:59:59.999Z'), '2026-11-01')
  assert.equal(teamDate('2026-02-30'), '')
  assert.throws(() => teamPeriod(undefined, undefined), /起止日期/)
  assert.throws(() => teamPeriod(period.end, period.start), /起止日期/)
})
test('counts Task plan effort without requiring a sprint field and clips cross-iteration dates', () => {
  const metrics = teamItemMetrics('Task', { DateSDate: '2026-10-24', qiwangwanchengriqi: '2026-10-28', planStoryPoint: 5, StoryPoint: 999 }, false, period)
  assert.equal(metrics.plannedDays, 5)
  assert.equal(metrics.periodDays, 3)
  assert.equal(metrics.storyPoints, null)
  assert.equal(teamItemMetrics('Task', { planStoryPoint: 1 }, true, period), null)
  assert.equal(teamItemMetrics('Task', { DateSDate: '2026-11-02', qiwangwanchengriqi: '2026-11-03', planStoryPoint: 2 }, true, period), null)
})
test('keeps undated sprint requirements, excludes out-of-window dated requirements and separates estimates', () => {
  assert.equal(teamItemMetrics('Story', { StoryPoint: 0 }, true, period).storyPoints, 0)
  assert.equal(teamItemMetrics('EnablerStory', {}, true, period).storyPoints, null)
  assert.equal(teamItemMetrics('Story', { StoryPoint: 5 }, false, period), null)
  assert.equal(teamItemMetrics('Story', { StoryPoint: 5, DateSDate: '2026-09-01', qiwangwanchengriqi: '2026-09-10' }, true, period), null)
  assert.equal(teamItemMetrics('Story', { StoryPoint: 5, DateSDate: period.start, qiwangwanchengriqi: period.end }, false, period).storyPoints, 5)
})
