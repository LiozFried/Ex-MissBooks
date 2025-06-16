const { useState } = React

export function LongText({ txt, length = 100 }) {

    const [isExpended, setIsExpended] = useState(True)

    return (
        <p className="long-text">{isExpended ? txt : txt.substring(0, length)}
        <span onClick={() => setIsExpended(!isExpended)}>{isExpended ? ' Show less...' : ' Show more ↓'}</span></p>
    )
}