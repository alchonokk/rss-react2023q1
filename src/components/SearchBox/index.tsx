import React from 'react';

type SearchState = {
  searchField: string;
};

type SearchProps = object;

class SearchBox extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { searchField: localStorage.getItem('searchData') || '' };
  }

  componentDidMount() {
    const searchDataFromLocalStor = localStorage.getItem('searchData');
    if (searchDataFromLocalStor) {
      this.setState({ searchField: searchDataFromLocalStor });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchData', this.state.searchField);
  }

  componentDidUpdate() {
    localStorage.setItem('searchData', this.state.searchField);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    return (
      <input
        data-testid="input"
        type="search"
        className="search"
        placeholder="Search..."
        autoFocus
        onChange={this.handleChange}
        value={this.state.searchField}
        aria-label="cost-input"
      />
    );
  }
}

export { SearchBox };
