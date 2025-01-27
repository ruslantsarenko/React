import React, { useState, useEffect } from 'react';
import "/Study/React/HW2/src/App.css"

export default function List({ animals }) {
    const [list, setList] = useState(animals);
    const [activated, setActivated] = useState(0)

    useEffect(() => {
        if (activated === list.length) return;
        const interval = setInterval(() => {
            const unactivAnimals = list.filter((el) => !el.active);
            if (unactivAnimals.length === 0) return;
            const random = Math.floor(Math.random() * unactivAnimals.length);
            const updetedList = list.map((el) => {
                if (el === unactivAnimals[random]) {
                    return { ...el, active: true }
                }
                return el
            });
            setList(updetedList);
            setActivated(activated + 1);
        }, 1000);
        return () => clearInterval(interval)
    }, [activated, list])

    return (
        <>
            <table>
                <tbody>
                    {list.map((el, i) => (
                        <tr key={i} className={el.active ? 'active' : ''}>
                            <td>{el.type}</td>
                            <td>{el.icon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}