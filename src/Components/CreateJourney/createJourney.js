//React
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

//Context
import { useAuthContext } from "../../Context/authContext";
import { useUserContext } from "../../Context/userContext";

//Components
import Loading from "../../Components/Loading/loading";

export default function CreateJourney({ signup, setSignup }) {
  // Context
  const [authUser, loading, error] = useAuthContext();
  const [user, setUser] = useUserContext();
  const [waiting, setWaiting] = useState(true);

  console.log(user);

  // React Form
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    async function getUser() {
      if (authUser) {
        const res = await fetch(
          `https://falcon5ives.herokuapp.com/users/?email=${authUser.email}`
        );
        console.log("fetch");
        const data = await res.json();

        const payload = data.payload[0];

        !user && setUser(payload);
      }
    }
    getUser();
  }, [authUser, waiting]);

  useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
      console.log("timeout complete");
    }, 3000);
  }, []);

  function createJourney(msg) {
    console.log("User Input recieved", msg);

    const { employer, jobTitle, startDate, endDate, description } = msg;

    const newJourney = {
      uid: user.id ? user.id : user.uid,
      employer: employer,
      jobTitle: jobTitle,
      startDate: startDate,
      endDate: endDate ? endDate : null,
      description: description,
    };

    console.log(newJourney);

    fetch(`https://falcon5ives.herokuapp.com/journeys`, {
      method: "POST",
      body: JSON.stringify(newJourney),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("this is the user data: ", data))
      .then(() => {
        setUser(null);
        setSignup(false);
      })
      .catch((error) => console.log("user creation error error: ", error));
  }

  if (waiting) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Create Journey</h2>
      <form onSubmit={handleSubmit(createJourney)}>
        <label for="employer">Employer</label>
        <input name="employer" ref={register} required />

        <label for="jobTitle">Job Title</label>
        <input name="jobTitle" ref={register} required />

        <label for="startDate">Start Date</label>
        <input type="date" name="startDate" ref={register} required />

        <label for="endDate">End Date (if applicable)</label>
        <input type="date" name="endDate" ref={register} />

        <label for="description">Description</label>
        <textarea name="description" ref={register} required></textarea>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}