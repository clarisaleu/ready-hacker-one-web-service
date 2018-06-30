
import React, { Component } from 'react';
import './../../App.css';
import './../../css/menu.css';
import menuData_json from './../../data/menu.json';
import PropTypes from 'prop-types';
import MenuCard from './MenuCard';

import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

const HorizontalSidebar = ({ animation, direction, visible }) => (
  <Sidebar as={Segment} animation={animation} direction={direction} visible={visible}>
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as='h3'>New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid columns={3} divided>
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid>
    </Grid>
  </Sidebar>
)

HorizontalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as='a'>
      <Icon name='home' />
      Home
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='gamepad' />
      Games
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='camera' />
      Channels
    </Menu.Item>
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}


class MenuMain extends Component {
  state = {
  animation: 'push',
  direction: 'left',
  dimmed: false,
  visible: false,
  menuData: menuData_json
}

handleAnimationChange = animation => () =>
  this.setState({ animation, visible: !this.state.visible })

handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

handleDirectionChange = direction => () => this.setState({ direction, visible: false })

handleChangeOrder=(index, diff_count)=>{
  console.log(index, diff_count);
  const menuData = this.state.menuData;
  if(menuData[index].order == null){
    menuData[index].order = 0;
  }
  if(menuData[index].order+=diff_count >=0){
    menuData[index].order+=diff_count;    
  }
  this.setState({menuData: menuData })

}
render() {
  const { animation, dimmed, direction, visible, menuData } = this.state
  const vertical = direction === 'bottom' || direction === 'top'

  return (
    <div>
      <Button onClick={this.handleAnimationChange('push')}>Push</Button>


      <Sidebar.Pushable as={Segment}>
        {vertical ? (
          <HorizontalSidebar animation={animation} direction={direction} visible={visible} />
        ) : null}
        {vertical ? null : (
          <VerticalSidebar animation={animation} direction={direction} visible={visible} />
        )}

        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment basic>
            <Header as='h2'>
              <Icon name='food'/>
              Order #20092
            </Header>
            <Segment className='menu_card_parent'>
              {menuData.map((x, i)=>
                {return (
                  <div>
                    <MenuCard menu={x} handleChangeOrder={this.handleChangeOrder} itemIndex={i}></MenuCard>
                  </div>
                )}
              )

              }

            </Segment>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}
}

export default MenuMain;
