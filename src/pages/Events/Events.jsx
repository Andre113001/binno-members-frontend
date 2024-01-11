import EventCards from './EventCards.jsx'
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import Header from '../../components/header/Header.jsx';
import styles from './Events.module.css'
import NewEventModal from '../../components/newEventModal/newEventModal.jsx';

function Events() {

  return (
    <>
    <div className={styles['EventsPage']}>
      <SideBar />
      <div className={styles['layoutContainer']}>
          <div className={styles["Headline"]}>
            <Header />
          </div>
              <div className={styles["bodyContainer"]}>
                <h1>My Events</h1>
                  <div className={styles["blogButtons"]}> {/*create button container*/}
                    <div className={styles["modalButton"]}>
                      <NewEventModal />
                    </div>
                  </div>
                  <div className={styles["modalButton"]}> {/*conntent section container*/}
                    <EventCards />
                  </div>
              </div>
        </div>        
      </div>
    </>
  )
}

export default Events
