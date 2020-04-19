import React, {useState} from "react"

import ExhibitMaster from "../components/exhibitmaster"
import ExhibitText from "../components/exhibittext"
import ImageFiles from "../components/imagefiles"
import { Button } from 'antd';
import { Row, Col, Tabs } from 'antd';

import Layout from "../components/layout"

import SEO from "../components/seo"

import VRMD from "../malloci/vrmd-parser"

import ExhibitDocument from "./exhibitdocument"
import Exhibit from "./exhibit"

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const IndexPage = () => {

  const [museumTree, setMuseumTree] = useState({rooms: [{name:"1"}, {name:"2"}]})
  console.log(museumTree);
  

  const updateExhibit = () => {
  
    const vrmdParser = new VRMD()
    const editor = document.getElementById('editor')
  
    let tree = vrmdParser.parse(editor.value)
    console.log("build exhibit", editor.value);
    setMuseumTree(tree)
  }
  
  return(

  <Layout>
    <SEO title="Malloci Editor" />
    <Row>
      <Col className="gutter-col" span={12}>
          <div className="gutter-row" id="exhibittext">
            <ExhibitText />
          </div>

          <div className="gutter-row">
            <Button onClick={() => {updateExhibit()}} type="primary">Build</Button>
          </div>
        
          <div className="gutter-row" id="imageupload">
            <ImageFiles></ImageFiles>
          </div>
        
      </Col>
      <Col className="gutter-col" span={12}>
        <div id="exhibitmaster">
          <div className="card-container">
            <Tabs onChange={callback} type="card">
                <TabPane id="exhibit_pane" tab="Exhibit" key="1">
                    <Exhibit tree= {{museumTree}} />
                </TabPane>
        
                <TabPane tab="Document" key="2">
                    <ExhibitDocument />
                </TabPane>
          </Tabs>
          </div>
        </div>
      </Col>
    </Row>

  </Layout>
)}



export default IndexPage
