import React, { Component } from 'react';

export default (props) => {

    return (
        <div class="modal fade bd-example-modal-lg" id={props.id ? props.id : "myModal1"} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class={`modal-dialog ${props.isSmall ? '' : 'modal-lg'}`} role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{props.title}</h4>
                    </div>
                    <div class="modal-body">
                        {props.children}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

 // <NewModal id='Stock' title='Place Order'>
 //                    {isStockActive ? <Stock id={productForStockData} changeCall={isStockActive} PlaceOrder={true} /> : 'Loading ...'}
 //                </NewModal>