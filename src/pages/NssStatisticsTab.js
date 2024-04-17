import { useState } from "react"

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NssStatisticsTab({ setSubType }) {
  const [tabs,setTabs] =useState( [
    { name: 'Mean', current: true },
    { name: 'Standard Deviation', current: false },
    { name: 'Skewness', current: false },
    { name: 'Kurtosis', current: false },
  ])
  const handleSelectChange = (selectedValue) => {
    const updateTabs = tabs.map(tab => {
        if (tab.name === selectedValue) {
            return { ...tab, current: true }
        }
        else {
            return { ...tab, current: false }
        }
    })
    setTabs(updateTabs)
    setSubType(selectedValue);
}
  
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
          onChange={(event) => handleSelectChange(event.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={() => handleSelectChange(tab.name)}
              className={classNames(
                tab.current ? 'bg-[#DBEAFE] text-[#1E40AF]' : 'text-[#2563EB] hover:text-gray-700',
                'rounded-md px-[20px] py-2 text-[15px] font-[500] cursor-pointer'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
