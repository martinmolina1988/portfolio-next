import react, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { Navbar } from './Navbar'
import SidebarExampleSidebar from './Sidebar'
import SidebarContent from './SidebarContent'
import styles from './Layout.module.css'

export const Layout = ({ children }) => {
  const [screenWidth, setScreenWidth] = react.useState(1000)
  function onWidth () {
    setScreenWidth(window.innerWidth)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // browser code
      window.addEventListener('resize', onWidth)
    }
    setScreenWidth(window.innerWidth)
  }, [])

  return (
      <SidebarExampleSidebar>
        <Navbar screenWidth={screenWidth} />
        <Grid style={{ minHeight: '100vh', color: 'white' }}>
          <Grid.Row>
            {screenWidth > 1000 && (
              <Grid.Column width={3}>
                <SidebarContent />
              </Grid.Column>
            )}{' '}
            <Grid.Column
              className={styles.children}
              width={screenWidth > 1000 ? 13 : 16}
            >
              {children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SidebarExampleSidebar>
  )
}
