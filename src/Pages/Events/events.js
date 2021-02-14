import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Config
import { url } from "../../config";

// Components
import UserLeftSide from "../../Components/userLeftSide/userLeftSide.js";

// Material Ui
import Card from "../../MaterialUi/Card/card.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// Styling
import style from "./events.module.css";

// User Context
import { useUserContext } from "../../Context/userContext";
import { useEventsContext } from "../../Context/eventsContext";

function GetAllEvents() {
  // Importing user data
  const [user] = useUserContext();

  const [allEvents, setAllEvents] = useEventsContext([]);
  const [attendingList, setAttendingList] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const { id } = useParams();

  console.log(`this is all events ${allEvents}`);

  function getEventType(event) {
    let eventTypeArr = event.map((event) => event.eventtype);

    return eventTypeArr.reduce((acc, curr) => {
      if (acc.find((value) => value === curr)) {
        return acc;
      }
      return [...acc, curr];
    }, []);
  }

  /*---------------Add to Attend Patch----------------*/
  let addToAttend = (id, arr) => {
    fetch(`${url}/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ attendingList: arr }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  async function get() {
    let res = await fetch(`${url}/events`);
    let data = await res.json();
    console.log("get");
    setAllEvents(data.payload);
    if (id) {
      filter(id);
      setFilterValue(id);
    }
  }

  useEffect(() => {
    allEvents && get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInterval(() => {
      get();
    }, 10000000);
  }, []);

  // Filter
  const [hideEducation, setHideEducation] = useState("");
  const [hideSocial, setHideSocial] = useState("");
  const [hideCommunity, setHideCommunity] = useState("");

  function filter(val) {
    if (val === "social") {
      setHideEducation("hide");
      setHideCommunity("hide");
      setHideSocial("");
    } else if (val === "community") {
      setHideEducation("hide");
      setHideSocial("hide");
      setHideCommunity("");
    } else if (val === "education") {
      setHideCommunity("hide");
      setHideSocial("hide");
      setHideEducation("");
    } else if (val === "all") {
      setHideCommunity("");
      setHideSocial("");
      setHideEducation("");
    }
  }

  // if (id && allEvents) {
  //   filter(id);
  //   setFilterValue(id);
  // }

  return (
    <div>
      {
        (user,
        allEvents && (
          <div className={style.row}>
            <UserLeftSide />
            <div className="container marginTop">
              <div className="column1">
                <section className="columnTwo">
                  <div className="welcome">
                    <h3
                      style={{
                        fontSize: "1.9rem",
                        marginTop: "0",
                        marginBottom: "0",
                      }}
                    >
                      Hello {user?.username} 👋
                    </h3>
                    <h4 style={{ marginTop: "0" }}>
                      Here are the current planned events
                    </h4>
                  </div>
                  <div className={style.buttons}>
                    <Link to="/createevent">
                      <button className="button">Create Event</button>
                    </Link>
                    <Link to="/myevents">
                      <button className="button">My Events</button>
                    </Link>
                  </div>

                  {/* <div>
                  <p for="filter">Filter by event type:</p>
                  <select
                    name="filter"
                    onChange={(e) => {
                      filter(e.target.value);
                    }}
                  >
                    <option selected value={"all"}>
                      All
                    </option>
                    {getEventType(allEvents).map((event) => {
                      return <option value={event}>{event}</option>;
                    })}
                  </select>
                </div> */}
                  <div className="marginBottom">
                    <InputLabel
                      shrink
                      id="demo-simple-select-placeholder-label-label"
                    >
                      Filter by Event Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={filterValue ? filterValue : "all"}
                      onChange={(e) => {
                        filter(e.target.value);
                        setFilterValue(e.target.value);
                      }}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      {getEventType(allEvents).map((event) => {
                        const eventTitle = `${event
                          .charAt(0)
                          .toUpperCase()}${event.slice(1)}`;
                        return <MenuItem value={event}>{eventTitle}</MenuItem>;
                      })}
                    </Select>
                  </div>

                  <section className={`contentContainer ${hideEducation}`}>
                    <h3>Education</h3>
                    <div>
                      <Grid container spacing={3}>
                        {allEvents.map((item) => {
                          if (item.eventtype === "education") {
                            let date = new Date(item.date).toDateString();
                            return (
                              <Grid item xs={4}>
                                <Paper>
                                  <Card
                                    key={uuidv4()}
                                    date={date}
                                    setAttending={setAttendingList}
                                    addToAttend={addToAttend}
                                    item={item}
                                  />
                                </Paper>
                              </Grid>
                            );
                          }
                        })}
                      </Grid>
                    </div>
                  </section>

                  <section className={`contentContainer ${hideSocial}`}>
                    <h3>Social</h3>

                    <Grid container spacing={3}>
                      {allEvents.map((item) => {
                        if (item.eventtype === "social") {
                          let date = new Date(item.date).toDateString();
                          return (
                            <Grid item xs={4}>
                              <Paper>
                                <Card
                                  key={uuidv4()}
                                  date={date}
                                  setAttending={setAttendingList}
                                  addToAttend={addToAttend}
                                  item={item}
                                  defaultDate={item.date}
                                />
                              </Paper>
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </section>

                  <section className={`contentContainer ${hideCommunity}`}>
                    <h3>Community</h3>
                    <Grid container spacing={3}>
                      {allEvents.map((item, index) => {
                        if (item.eventtype === "community") {
                          let date = new Date(item.date).toDateString();
                          return (
                            <Grid item xs={4}>
                              <Paper>
                                <Card
                                  key={uuidv4()}
                                  date={date}
                                  setAttending={setAttendingList}
                                  addToAttend={addToAttend}
                                  item={item}
                                />
                              </Paper>
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </section>
                </section>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default GetAllEvents;
