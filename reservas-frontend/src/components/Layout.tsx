
import { memo } from 'react';

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = memo(({ children }) => {
  //className='flex flex-col items-center h-1/2 py-4 mt-0 lg:mt-16'>  w-[95%]
  return (
    <>
      <div className="w-full h-full absolute top-16 lg:w-fit lg:left-96">
        <main className="flex flex-1 flex-col gap-4 m-2 p-2 lg:gap-6">
          {children}
        </main>
      </div>
    </>
  )
})
