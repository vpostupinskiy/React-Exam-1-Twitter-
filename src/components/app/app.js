import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import "./app.css";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: "Откуда дровишки?", important: true, like: false, id: "eryuuy"},
                {label: "Из лесу, вестимо!", important: false, like: false, id: "wryrtfdf"},
                {label: "Отец, слышишь, рубит, а я отвожу!", important: false, like: false, id: "bvcgd"}
            ],
            term: "",
            filter: "all"
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    searchPost(items, term){
        if(term.length === 0){
            return items
        }
        return items.filter(
            item => {
                return item.label.indexOf(term) > -1
            }
        )
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex( elem => elem.id === id );
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        })
    }
    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        } )
    }
    onToggleImportant(id) {
        this.setState( ({data}) => {
            const index = data.findIndex( elem => elem.id === id );
            const old = data[index];
            const newItem = {...old, important: !old.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }}
        )
    }
    onToggleLiked(id) {
            this.setState( ({data}) => {
                const index = data.findIndex( elem => elem.id === id );
                const old = data[index];
                const newItem = {...old, like: !old.like};
                const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
                return {
                    data: newArr
                }}
            )
    }
    onUpdateSearch(term){
        this.setState({term})
    }

    static filterPosts(items, filter){
        if( filter === "like") {
            return items.filter( v => v.like )
        }
        else {
            return items
        }
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(v => v.like).length;
        const allPosts = data.length;
        const visiblePosts = App.filterPosts(this.searchPost(data, term),filter);
        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}
