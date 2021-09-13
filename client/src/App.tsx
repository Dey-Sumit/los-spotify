import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { accessToken, logout } from "./spotify";

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState<string | null | false>(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="app">
      {!token ? (
        <Login />
      ) : (
        <>
          {/* <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton> */}

          <Router>
            <ScrollToTop />

            <Switch>
              {/* <Route path="/top-artists">
                <TopArtists />
              </Route>
              <Route path="/top-tracks">
                <TopTracks />
              </Route>
              <Route path="/playlists/:id">
                <Playlist />
              </Route>
              <Route path="/playlists">
                <Playlists />
              </Route> */}
              <Route path="/">
                <Profile />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
