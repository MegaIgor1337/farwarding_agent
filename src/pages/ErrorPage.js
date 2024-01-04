import React from "react"


class ErrorPage extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    history.push("/error"); // Перенаправить на ваш маршрут ошибки
  }

  render() {
    return (
      <div>Hello</div>
    );
  }
}

export default ErrorPage;