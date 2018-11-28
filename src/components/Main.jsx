import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {connect} from 'react-redux'
import classNames from 'classnames'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import IconButton from '@material-ui/core/IconButton'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Main extends React.Component {
  state = {
    initView: true,
    loading: false,
    users: null,
    errorMsg: null
  }
  componentWillReceiveProps(newProps) {//指定了新的searchName，需要发请求
    //当组件接收到新的属性时调用
   const {searchName} = newProps
    //更新状态为请求中
    this.setState({
      initView: false,
      loading: true
    })
    //发ajax请求
    const url = `https://api.github.com/search/users?q=${searchName}`
    axios.get(url)
      .then(response => {
        //得到响应数据
        const result = response.data
        console.log(result)
        const users = result.items.map(item => (
          {
            name: item.login,
            url:item.html_url,
            avatarUrl:item.avatar_url,
            score:item.score,
          }
        ))
        //更新状态为成功
        this.setState({
          loading: false,
          users
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          errorMsg: error.message
        })
      })
  }
  render() {
    const {initView, loading, users, errorMsg} = this.state
    const {searchName, classes} = this.props
    if (initView) {
      return (<h2>Please enter search keywords: {searchName}</h2>)
    } else if (loading) {
      return (<h2>Loading</h2>)
    } else if (errorMsg) {
      return (<h2>{{errorMsg}}</h2>)
    } else {

      return (
        <React.Fragment>
          <CssBaseline/>
          <main>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              {/* End hero unit */}
              <Grid container spacing={40}>
                {users.map((user,index) => (
                  <Grid item  key={index} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <CardActionArea href={user.url}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={user.avatarUrl}
                        title="User avatar"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                         {user.name}
                        </Typography>
                        <Typography component="p">
                          Score: {user.score}
                        </Typography>
                        <Typography component="p">
                          Click to find more about me.
                        </Typography>
                      </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <IconButton aria-label="Add to favorites">
                          <FavoriteIcon color="secondary"/>
                        </IconButton>
                        <IconButton aria-label="Share">
                          <ShareIcon color="secondary"/>
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Search Github Users
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Copyright ©2018 All rights reserved |Made with React by Yi Zhou
            </Typography>
          </footer>
          {/* End footer */}
        </React.Fragment>
      )
    }
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
  searchName:PropTypes.string.isRequired,
}
export default connect(state => ({searchName:state.searchName}))(withStyles(styles)(Main))