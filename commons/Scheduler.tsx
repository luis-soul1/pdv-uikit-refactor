import { Fragment } from 'react'

import Box from '@mui/material/Box'
import dayjs from 'dayjs'

import { PdvIcons } from '@Uikit/PdvIcons'
import { IScheduleDayBlock, IScheduleDays } from 'types/interfaces/requests/IPeriod'

type TSchedulerProps = {
  blocks: number
  scheduleDays: IScheduleDays[]
  mode?: 'time' | 'subjects'
  onClickBlock: (scheduleDays: IScheduleDays[], block: IScheduleDayBlock) => void
}

const Scheduler = (props: TSchedulerProps) => {
  const { blocks = 11, scheduleDays = [], onClickBlock, mode = 'time' } = props

  return (
    <Box
      className="w-full gap-[1px]"
      display="grid"
      gridAutoFlow="column"
      gridTemplateRows={`59px repeat(${blocks}, 1fr)`}
      gridTemplateColumns={`66px repeat(${scheduleDays.filter(({ active }) => active).length}, 1fr)`}
    >
      <Blocks blocksAmount={blocks} />
      <DayBlocks mode={mode} scheduleDays={scheduleDays} onClickBlock={(scheduleDays, block) => onClickBlock(scheduleDays, block)} />
    </Box>
  )
}

type TBlocksProps = {
  blocksAmount: number
}

const Blocks = (props: TBlocksProps) => (
  <>
    <div className="subtitle1 flex w-full items-center justify-center bg-yellow-300 p-4 text-white">Bloque</div>

    {[...Array(props.blocksAmount)].map((_, index) => {
      return (
        <div className="subtitle1 flex w-full items-center justify-center bg-yellow-300 p-4 text-white" key={index}>
          <span className="subtitle1 h-6 w-6 rounded-full bg-white text-center text-orange-600">{++index}</span>
        </div>
      )
    })}
  </>
)

type TDayBlocksProps = {
  scheduleDays: IScheduleDays[]
  mode: 'time' | 'subjects'
  onClickBlock: (scheduleDays: IScheduleDays[], block: IScheduleDayBlock) => void
}

const DayBlocks = (props: TDayBlocksProps) => (
  <>
    {props.scheduleDays.map((dayBlock) => (
      <Fragment key={dayBlock.id}>
        {dayBlock.active && (
          <>
            <div className="subtitle1 flex w-full items-center justify-center bg-orange-400 p-5 font-semibold text-white">
              {dayBlock.SchedulesDaysConfigs.name}
            </div>

            {props.mode === 'time' &&
              dayBlock.SchedulesDaysBlocks.sort((a, b) => a.block - b.block).map((block) => {
                if (block.active) {
                  return (
                    <TimeBlock
                      key={block.id}
                      start={block.time_start}
                      end={block.time_end}
                      onClickBlock={() => props.onClickBlock(props.scheduleDays, block)}
                    />
                  )
                }

                return <BlockDisabled key={block.id} />
              })}

            {props.mode === 'subjects' &&
              groupBlocksBySubjectCourse(dayBlock.SchedulesDaysBlocks.sort((a, b) => a.block - b.block)).map((block) => {
                if (block.active && block.time_start && block.time_end) {
                  return (
                    <SubjectBlock
                      key={block.id}
                      start={block.time_start}
                      end={block.time_end}
                      subject={block.BlockAssignment?.Subjects?.name ?? block.BlockAssignment?.ExtracurricularSubjects?.name}
                      course={block.BlockAssignment?.UsersSubjectsCourses?.Courses?.name}
                      colour={block.BlockAssignment?.colour}
                      onClickBlock={() => props.onClickBlock(props.scheduleDays, block)}
                      rowSpan={block.rowSpan}
                      isActive={!!block.BlockAssignment?.active}
                    />
                  )
                }

                return <BlockDisabled key={block.id} />
              })}
          </>
        )}
      </Fragment>
    ))}
  </>
)

type TTimeBlockProps = {
  start: string | null
  end: string | null
  onClickBlock: () => void
}

const TimeBlock = (props: TTimeBlockProps) => {
  if (props.start && props.end) {
    return (
      <div
        className="subtitle1 flex w-full cursor-pointer items-center justify-center bg-gray-25 font-semibold text-white"
        onClick={props.onClickBlock}
      >
        <div className="relative flex h-full w-full items-center justify-center border border-gray-25 bg-white">
          <span className="copy1 block text-center font-bold text-gray-500">
            <PdvIcons name="Calendar" size="small" color="blue-500" /> {dayjs(props.start, 'HH:mm').format('HH:mm')} a{' '}
            {dayjs(props.end, 'HH:mm').format('HH:mm')}
          </span>
        </div>
      </div>
    )
  }

  return <AddBlock onClickBlock={props.onClickBlock} />
}

type TSubjectBlock = IScheduleDayBlock & { rowSpan: number }

const groupBlocksBySubjectCourse = (dayBlocks: IScheduleDayBlock[]) => {
  const blocksGrouped = dayBlocks.reduce((blocks: TSubjectBlock[], block) => {
    const blockObj = { rowSpan: 1, ...block }
    const prevBlock = blocks[blocks.length - 1]
    const blockHasSubject = block?.BlockAssignment?.Subjects || block?.BlockAssignment?.ExtracurricularSubjects
    const assigmentIsActive = block?.BlockAssignment?.active

    if (block.active && blockHasSubject && assigmentIsActive) {
      const prevSubjectId = prevBlock?.BlockAssignment?.extracurricular_id ?? prevBlock?.BlockAssignment?.subject_id
      const prevCourseId = prevBlock?.BlockAssignment?.UsersSubjectsCourses?.Courses.id
      const prevBlockIsActive = prevBlock?.BlockAssignment?.active

      const currentSubjectId = block?.BlockAssignment?.extracurricular_id ?? block.BlockAssignment?.subject_id
      const currentCourseId = block?.BlockAssignment?.UsersSubjectsCourses?.Courses.id

      if (prevSubjectId === currentSubjectId && prevCourseId === currentCourseId && block.BlockAssignment?.active && prevBlockIsActive) {
        blocks[blocks.length - 1].rowSpan++
        blocks[blocks.length - 1].time_end = block.time_end
        return [...blocks]
      }
    }

    return [...blocks, blockObj]
  }, [])

  return blocksGrouped
}

type TSubjectBlockProps = {
  start: string | undefined
  end: string | undefined
  subject: string | undefined
  course: string | undefined
  rowSpan: number
  isActive: boolean
  colour: string | undefined
  onClickBlock: () => void
}
const SubjectBlock = (props: TSubjectBlockProps) => {
  const { start = undefined, end = undefined, subject = undefined, course = undefined, rowSpan = 1, isActive, colour = '#fcb766' } = props

  if (subject && course && isActive) {
    return (
      <div
        className="subtitle1 flex w-full cursor-pointer items-center justify-center bg-gray-25 p-1 font-semibold text-white"
        onClick={props.onClickBlock}
        style={{ gridRow: `span ${rowSpan}` }}
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-md">
          <div className="w-full overflow-hidden">
            <span className="block  h-2 w-full" style={{ backgroundColor: colour }} />

            <div className="flex items-center justify-center gap-1 bg-white py-1">
              <PdvIcons name="Calendar" size="small" color="gray-500" />
              <span className="body2 font-semibold text-gray-500">
                {dayjs(start, 'HH:mm').format('HH:mm')} - {dayjs(end, 'HH:mm').format('HH:mm')}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col items-center justify-center py-1">
            <div className="flex items-center justify-center gap-1">
              <span className="h-1.5 w-1.5 rounded" style={{ backgroundColor: colour }} />
              <span className="body2 w-9/12 text-center font-semibold text-gray-500">{subject}</span>
            </div>
            <span className="body2 font-normal text-gray-500">{course}</span>
          </div>
        </div>
      </div>
    )
  }

  return <AddBlock onClickBlock={props.onClickBlock} />
}

type TAddBlockProps = {
  onClickBlock: () => void
}

const AddBlock = (props: TAddBlockProps) => (
  <div className="flex w-full cursor-cell items-center justify-center bg-gray-25 p-5" onClick={props.onClickBlock}>
    <PdvIcons name="AddCircle" color="teal-500" />
  </div>
)

const BlockDisabled = () => (
  <div className="flex w-full cursor-not-allowed items-center justify-center bg-gray-25 p-5">
    <PdvIcons name="Disabled" color="gray-200" />
  </div>
)

export default Scheduler
