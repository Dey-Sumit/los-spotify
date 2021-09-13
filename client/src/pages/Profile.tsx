import { useEffect, useState } from "react";
import { getCurrentUserProfile } from "../spotify";
import { catchErrors } from "../utils";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);
    };

    catchErrors(fetchData)();
  }, []);
  console.log(profile);

  return <div>Profile Page</div>;
};

export default Profile;
