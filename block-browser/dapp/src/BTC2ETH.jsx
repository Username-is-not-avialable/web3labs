import { useState, useEffect } from "react";
import { ethers } from "ethers";

function BTC2ETH({ provider }) {
    const [price, setPrice] = useState(null);
    const [roundData, setRoundData] = useState(null);
    const addr = "0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22"; // Адрес контракта
    const abi = [
        {
            inputs: [],
            name: "latestRoundData",
            outputs: [
                { internalType: "uint80", name: "roundId", type: "uint80" },
                { internalType: "int256", name: "answer", type: "int256" },
                { internalType: "uint256", name: "startedAt", type: "uint256" },
                { internalType: "uint256", name: "updatedAt", type: "uint256" },
                { internalType: "uint80", name: "answeredInRound", type: "uint80" },
            ],
            stateMutability: "view",
            type: "function",
        },
    ];

    useEffect(() => {
        async function fetchPriceData() {
            const priceFeed = new ethers.Contract(addr, abi, provider);
            try {
                const roundData = await priceFeed.latestRoundData();
                setRoundData(roundData);

                // Конвертируем BigInt в строку перед форматированием
                const price = ethers.formatUnits(roundData.answer.toString(), 18);
                setPrice(price);
            } catch (error) {
                console.error("Error fetching price data:", error);
            }
        }

        if (provider) {
            fetchPriceData();
        }
    }, [provider]);

    return (
        <div>
            <h2>BTC/ETH Price Feed</h2>
            {price ? (
                <div>
                    <p>Current BTC/ETH Price: {price}</p>
                    <p>Round ID: {roundData.roundId.toString()}</p>

                    {/* Преобразование BigInt в число для работы с датой */}
                    <p>Updated At: {new Date(Number(roundData.updatedAt) * 1000).toLocaleString()}</p>
                </div>
            ) : (
                <p>Loading price data...</p>
            )}
        </div>
    );
}

export default BTC2ETH;
