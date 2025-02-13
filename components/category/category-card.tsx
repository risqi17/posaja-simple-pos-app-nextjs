'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { CATEGORY_ICON_MAP, CATEGORY_PARAMS } from '@/lib/constants'
import { Category } from '@/lib/types'
import { cn, formatCategoryName, lightenColor } from '@/lib/utils'

interface CategoryCardProps extends React.ComponentPropsWithoutRef<'div'> {
	category: Category
}

export default function CategoryCard({
	category,
	className,
	...props
}: CategoryCardProps) {
	const [isHovered, setIsHovered] = useState(false)

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const categoryNameParams = formatCategoryName(category.name)
	const CategoryIcon = CATEGORY_ICON_MAP.get(categoryNameParams)!
	const selectedCategory = searchParams.get(CATEGORY_PARAMS)
	const isSelectedCategory =
		selectedCategory && selectedCategory === categoryNameParams

	const handleClick = () => {
		const urlSearchParams = new URLSearchParams(searchParams)

		if (isSelectedCategory) {
			urlSearchParams.delete(CATEGORY_PARAMS)
		} else {
			urlSearchParams.set(CATEGORY_PARAMS, categoryNameParams)
		}

		router.replace(`${pathname}?${urlSearchParams.toString()}`)
	}

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleClick}
			style={{
				color: isHovered
					? 'hsl(var(--accent-foreground))'
					: 'hsl(var(--foreground))',
				backgroundColor:
					isSelectedCategory && isHovered
						? 'hsl(var(--accent))'
						: isSelectedCategory && !isHovered
							? 'hsl(var(--background))'
							: !isSelectedCategory && isHovered
								? lightenColor(category.color, 30)
								: lightenColor(category.color, 50),
			}}
			className={cn(
				'flex w-[200px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-input p-4 shadow-sm transition-colors',
				className,
			)}
			{...props}
		>
			<span className="text-sm">{category.name}</span>
			<div
				style={{
					backgroundColor: isHovered
						? category.color
						: lightenColor(category.color, 20),
				}}
				className="flex size-12 shrink-0 items-center justify-center rounded-full transition-colors"
			>
				<CategoryIcon className="size-5 shrink-0" />
			</div>
		</div>
	)
}
