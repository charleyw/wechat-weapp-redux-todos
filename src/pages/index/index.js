//index.js
const {WeAppRedux: {connect}} = require( '../../libs/index' );

const pageConfig = {
  data: {
    projects: [{id: 1, name: '生活'}, {id: 2, name: '工作'}]
  }
}


const mapStateToData = state => ({});

const mapDispatchToPage = dispatch => ({})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);