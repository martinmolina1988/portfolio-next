import { createContext, useContext, useState } from 'react'

const TaskContext = createContext()

export const TasksProvider = ({ children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <TaskContext.Provider
      value={{
        visible,
        setVisible
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  return useContext(TaskContext)
}
