import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from 'components/Common/NotFoundPage';
import { Item, mapStateToProps } from 'components/Item';

describe('component/Item', () => {
  let props;
  let wrapper;
  let notFoundPage;

  const update = () => {
    wrapper.update();
    notFoundPage = wrapper.find(NotFoundPage);
  };
  const setup = () => {
    wrapper = shallow(<Item {...props} />);
    update();
  };

  beforeEach(() => {
    props = {
      itemId: 0,
      categoryId: 1,
      history: {
        push: jest.fn(),
      },
      isLoadingItem: false,
      item: {
        name: 'test',
        description: 'test',
        price: 30,
        id: 1,
        userId: 0,
      },
      fetchItem: jest.fn().mockResolvedValue({
        success: true,
      }),
      userCurrent: 10,
    }
  });
  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render modifyButton', () => {
    props.item.userId = 10;
    setup();
    expect(wrapper).toMatchSnapshot();

    props.item = undefined;
    setup();
    expect(wrapper).toMatchSnapshot();

    props.isLoadingItem = true;
    setup();
    expect(wrapper).toMatchSnapshot();
  });
  // componentDidMount
  it('should fetchItem when mounted', () => {
    setup();
    expect(props.fetchItem).toHaveBeenCalled();
  });
  // componentDidUpdate
  it('should fetchItem when categoryId or itemId changes', () => {
    setup();
    expect(props.fetchItem).toHaveBeenCalledTimes(1);
    wrapper.setProps({ itemId: 10 });
    expect(props.fetchItem).toHaveBeenCalledTimes(2);

    wrapper.setProps({ categoryId: 10 });
    expect(props.fetchItem).toHaveBeenCalledTimes(3);

    wrapper.setProps({ userCurrent: 5 });
    expect(props.fetchItem).toHaveBeenCalledTimes(3);
  });
  // this.fetchItem
  it('should display 404 page when fail fetching items', async () => {
    props.fetchItem = () => Promise.resolve({ success: false });
    setup();
    await new Promise((resolve) => {
      setImmediate(resolve)
    });
    expect(notFoundPage).toBeTruthy();
  })
})

describe('component/Item (mapStateToProps)', () => {
  let state;
  let match;
  beforeEach(() => {
    state = { user: { userId: 10 }, item: { byId: [] } };
    match = { params: { categoryId: 1, itemId: 2 } };
  });

  it('should return the right categoryId/itemId from path', () => {
    expect(mapStateToProps(state, { match }).categoryId).toBe(1);
    expect(mapStateToProps(state, { match }).itemId).toBe(2);
  });
  it('should return userId/item correctly from state', () => {
    expect(mapStateToProps(state, { match }).userCurrent).toBe(10);
    expect(mapStateToProps(state, { match }).item).toBeFalsy();
  })
});
