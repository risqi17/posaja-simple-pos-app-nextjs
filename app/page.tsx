import { Separator } from "@/components/ui/separator";

import CategoryCardListSkeleton from '@/components/skeleton/category-card-list-skeleton'

import { delay }  from '@/lib/utils'
import { lazy, Suspense } from "react";

const CategoryCardList = lazy(async () => {
	const [moduleExports] = await Promise.all([
		import('@/components/category/category-card-list'),
		delay(),
	])

	return moduleExports
})

export default function Home() {
  return (
    <main className="mx-auto flex h-dvh max-w-xl flex-col">
      <section className="flex items-center justify-between gap-2 p-4 pb-0">

      </section>
      <Suspense fallback={<CategoryCardListSkeleton className="py-4" />}>
			  <CategoryCardList className="py-4" />
      </Suspense>

      <div className="my-1 px-4">
        <Separator />
      </div>
			<section className="flex flex-col gap-2">
        <div className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-input p-4 shadow-sm transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rinso Cair</span>
          </div>
        </div>
      </section>
    </main>
  );
}
