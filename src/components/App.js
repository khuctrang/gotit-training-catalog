/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert } from 'react-bootstrap'
import PropTypes from 'prop-types';

import Header from 'components/Common/Header';
import Category from 'components/Category';
import Item from 'components/Item';
import ModalContainer from 'components/Common/ModalContainer';
import CategoryList from 'components/Common/CategoryList';
import LoadingPage from 'components/Common/LoadingPage';
import NotFoundPage from 'components/Common/NotFoundPage';

import { fetchCategory } from 'actions/category';
import { fetchUser } from 'actions/user';
import { getCategories } from 'reducers';

export class App extends React.Component {
  componentDidMount() {
    const { fetchCategory, fetchUser } = this.props;
    fetchUser();
    fetchCategory();
  }

  renderCategory = () => {
    const {
      categories, userId, isLoading, error,
    } = this.props;
    if (categories.length) {
      return (
        <div>
          <Header isSignedIn={!!userId} />
          <Switch>
            <Route
              exact
              path="/categories/items/:categoryId/:itemId"
              render={() => (
                <div className="w-75 mx-auto">
                  <CategoryList
                    categories={categories}
                    defaultSelected={categories[0].id}
                  />
                  <Item />
                </div>
              )}
            />
            <Route
              exact
              path="/categories/:categoryId"
              render={() => (
                <div className="w-75 mx-auto">
                  <CategoryList
                    categories={categories}
                    defaultSelected={categories[0].id}
                  />
                  <Category />
                </div>
              )}
            />
            <Route
              exact
              path="/"
              render={() => <Redirect to={`/categories/${categories[0].id}`} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      )
    }
    // prevent any actions before both user and category state are ready
    if (isLoading) {
      return <LoadingPage />
    }
    // show Error if fetchCategory failed
    return <Alert variant="danger">{error || 'No record found'}</Alert>
  }

  render() {
    return (
      (
        <Container className="App my-4">
          {this.renderCategory()}
          <ModalContainer />
        </Container>
      )
    );
  }
}

export const mapStateToProps = (state) => ({
  categories: getCategories(state),
  userId: state.user.userId,
  isLoading: state.user.isLoading || state.category.isLoading,
  error: state.category.error,
});

App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  fetchCategory: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  error: PropTypes.string,
}

export default connect(mapStateToProps, { fetchCategory, fetchUser })(App);
