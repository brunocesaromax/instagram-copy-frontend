import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    };

    /* Formato de arrow function, para conseguir acessar o this */
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    /* Imagens vem em formato de array */
    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleSubmit = async e => {
        /* Previne o redirecionamento de página do html ao dar submit */
        e.preventDefault();
        //console.log(this.state);
    
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts',data)
        
        /* Histórico de navegação do usuário , e manda para a tela inicial da aplicação*/
        this.props.history.push('/');
    }

    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}/>

                <input type="text"
                    name="author"
                    placeholder="Autor do post"
                    onChange={this.handleChange}
                    value={this.state.author}
                />

                <input type="text"
                    name="place"
                    placeholder="Local do post"
                    onChange={this.handleChange}
                    value={this.state.place}
                />

                <input type="text"
                    name="description"
                    placeholder="Descrição do post"
                    onChange={this.handleChange}
                    value={this.state.description}
                />

                <input type="text"
                    name="hashtags"
                    placeholder="Hashtags do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}
                />

                <button type="submit">Enviar</button>
            </form>

        );
    }
}

export default New;