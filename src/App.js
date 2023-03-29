import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Intro from './pages/IntroPage'
import Candilist from './pages/CandidateList'
import Processing from './pages/Processing'
import AskFingerprint from './pages/AskFingerPrint'
import Complete from './pages/Complete'
import Errors from './pages/Error'
import AdminAuth from './components/AdminAuth'


class App extends React.Component {
  state = {}
  async componentDidMount() {

  }
  render() {
    return (
      <div className="overflow-hidden">
        <Routes>
          <Route
            path="/candilist"
            element={<Candilist data={this.state.data} />}
          />
          <Route path="/errors" element={<Errors/>} />
          <Route path="/processing" element={Processing} />
          <Route path="/askfp" element={<AskFingerprint/>} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/" exact element={<Intro data={this.state.data} />} />
          <Route path='/admin/*' element={<AdminAuth/>}/>

        </Routes>
      </div>
    )
  }
}

export default App
