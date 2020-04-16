import React, { Component } from 'react'

export class Modal extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Rate"/>
                    <input type="text" placeholder="Code"/>
                </form>
            </div>
        )
    }
}

export default Modal
