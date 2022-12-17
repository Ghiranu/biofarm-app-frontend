import { SCROLL_TYPE } from 'shared'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
	numberOfRows: number
	refreshData: boolean | undefined
	setRefreshData?: (
		_value: boolean | ((_prevState: boolean) => boolean),
	) => void
}

const useTable = (props: Props) => {
	const { numberOfRows, refreshData, setRefreshData } = props
	const [scrollType, setScrollType] = useState<string>(SCROLL_TYPE.AUTO)
	const [isScrolling, setIsScrolling] = useState<boolean>(false)
	const [lastScroll, setLastScroll] = useState<number>(0)
	const timerID: { current: number | ReturnType<typeof setTimeout> } =
		useRef(-1)
	const scrollTimer: { current: number | ReturnType<typeof setTimeout> } =
		useRef(-1)
	const tableRef = useRef<HTMLInputElement>(null)
	const resetTimeoutMs = 5000
	const removeScrollListenerTimeoutMs = 500

	const setScroll = useCallback(() => {
		if (timerID.current) {
			clearTimeout(timerID.current)
			timerID.current = -1
		}
		setScrollType(SCROLL_TYPE.AUTO)
	}, [])

	const resetScrollAfterTimeout = useCallback(() => {
		timerID.current = setTimeout(() => {
			setScrollType(SCROLL_TYPE.HIDDEN)
		}, resetTimeoutMs)
	}, [])

	const handleScroll = useCallback(() => {
		setIsScrolling(true)
		setLastScroll(window.scrollX)
		if (timerID.current) {
			clearTimeout(timerID.current)
		}
		if (
			scrollType === SCROLL_TYPE.AUTO &&
			window.scrollX === lastScroll
		) {
			setScrollType(SCROLL_TYPE.HIDDEN)
		}
	}, [scrollType, lastScroll])

	const mouseOverHandler = useCallback(() => {
		if (!isScrolling && scrollType === SCROLL_TYPE.HIDDEN) {
			setScrollType(SCROLL_TYPE.AUTO)
		}
		return null
	}, [isScrolling, scrollType])

	const targetIsNotPresentInCurrentRef = (target, ref) => {
		return !ref.current.contains(target)
	}

	const clickedOutsideContainer = (ref, event) => {
		if (event.target.tagName === 'MAIN') {
			return false
		}
		return ref.current && targetIsNotPresentInCurrentRef(event.target, ref)
	}
	const timerExists = (timerId: number | ReturnType<typeof setTimeout>) =>
		timerId !== -1

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		if (scrollTimer.current !== null) {
			clearTimeout(scrollTimer.current)
		}

		scrollTimer.current = setTimeout(() => {
			setIsScrolling(false)
		}, removeScrollListenerTimeoutMs)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [handleScroll])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				clickedOutsideContainer(tableRef, event) &&
				timerExists(timerID.current)
			) {
				clearTimeout(timerID.current)
				setScrollType(SCROLL_TYPE.HIDDEN)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [tableRef])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [numberOfRows])

	const refreshError = useCallback(() => {
		if (setRefreshData) {
			setRefreshData(!refreshData)
		}
	}, [refreshData, setRefreshData])
	return {
		tableRef,
		scrollType,
		refreshError,
		mouseOverHandler,
		resetScrollAfterTimeout,
		setScroll,
	}
}

export default useTable
