import { useTasks } from 'context/TasksContext'
import React from 'react'
import { Menu, Segment, Sidebar } from 'semantic-ui-react'
import SidebarContent from './SidebarContent'
import styles from './Layout.module.css'
const SidebarExampleSidebar = ({ children }) => {
  const { visible, setVisible } = useTasks()
  return (
    <Sidebar.Pushable as={Segment} className={styles.sidebar}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
      >
        <SidebarContent />
      </Sidebar>

      <Sidebar.Pusher>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarExampleSidebar
