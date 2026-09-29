import React from 'react'

const TextBlockInput = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 md:border-r border-[#dddddd] basis-full md:basis-1/3">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          Text
        </div>
        <div className="drawer-subitem-items flex items-center flex-wrap justify-start gap-3">
           <textarea name="name" id="name" className='input--field rounded bg-slate-50' rows={5} placeholder='Text'></textarea>
        </div>
      </div>
    </div>
  )
}

export default TextBlockInput