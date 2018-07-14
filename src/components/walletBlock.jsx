import React from 'react'

const WalletBlock = ({items}) => {
    let blocks = items.map((item) => {
        return (
                <div className="wallet" key = {item.account}>
                    <div className="wallet__balance">
                        <span className="close">Close</span>
                        <span className="text">Ether balance</span>
                        <p>{digitNumber(item.balance)}</p>
                    </div>
                    <div className="wallet__account">
                        <div className="wallet__account__address">
                            <span>Address</span>
                            <p>{item.account}</p>
                        </div>
                        <div className="wallet__account__navigation">
                            <p>More</p>
                        </div>
                    </div>
                </div>
        )
    })
    return (
        <div className="grid_for_wallets">{blocks}</div>
    )
}

const digitNumber = (balance) => {
    let b = (balance/Math.pow(10,18)).toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1,');
    return b;
};

export default WalletBlock
