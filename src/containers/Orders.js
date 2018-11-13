import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUserOrders } from '../store/actions/orders';
import OrdersHeader from '../components/OrdersHeader';
import OrderCard from '../components/OrderCard';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'new'
    }

    this.onSelectChange = this.onSelectChange.bind(this);
    this.renderOrders = this.renderOrders.bind(this);
  }

  componentWillMount() {
    this.props.fetchUserOrders();
  }

  onSelectChange(e) {
    this.setState({
      filter: e.target.value
    })
  }

  renderOrders() {
    const { orders } = this.props;
    return _.map(orders, (order) => {
      return(
        <OrderCard order={order} key={order.id} />
      );
    })
  }

  render() {
    const { filter } = this.state;
    return (
      <div className="order-section">
        <div className="raised orders-container">
          <OrdersHeader filter={filter} onSelectChange={this.onSelectChange}/>
          <ul className="orders">
            {this.renderOrders()}
          </ul>
        </div>
        <div className="raised food-list-container">
          <ul className="food-list">
            <li className="food-card">
              <div className="img-thumbnail">
                <img alt="Chicken Salad" src="https://www.ndtv.com/cooks/images/chicken%20cheese%20salad-620.jpg?downsize=650:400&output-quality=70&output-format=webp" />
              </div>
              <div className="food-details">
                <p>
                  <span className="semi-bold">Chicken & Cheese Salad</span>
                </p>
                <p>
                  <span className="bold">{"\u20A6"}2,500</span>
                </p>
                <p>
                  <span className="semi-bold">Quantity: </span>
                  <span>1</span>
                </p>
                <p>
                  <span className="semi-bold">Status: </span>
                  <span>Delivered</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

export default connect(mapStateToProps, { fetchUserOrders })(Orders);
