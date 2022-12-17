import React, { useCallback } from 'react'
import { Pagination as PaginationButtons } from '@mui/material'

type Props = {
	currentPage: number
	numberOfPages: number
	setPage: (_value: number | ((_prevState: number) => number)) => void
	styling?: React.CSSProperties | undefined
}

const PaginationComponent: React.FC<Props> = ({
	currentPage,
	numberOfPages,
	setPage,
	styling,
}) => {
	const changeHandler = useCallback(
		(_e, page) => {
			setPage(page - 1)
		},
		[setPage],
	)
	return (
		<PaginationButtons
			sx={{
				'& .MuiButtonBase-root': {
					borderRadius: '8px',
					background: '#FCFBFA',
					fontFamily: 'EONBrixSans-Regular',
					fontSize: '18px',
					lineHeight: '24px',
				},
				'& .Mui-selected': {
					background: '#E6E3E1',
					fontFamily: 'EONBrixSans-Bold',
					fontSize: '18px',
					lineHeight: '24px',
				},
			}}
			page={currentPage}
			count={numberOfPages}
			onChange={changeHandler}
			style={styling}
		/>
	)
}

PaginationComponent.defaultProps = {
	styling: undefined,
}

export default PaginationComponent
