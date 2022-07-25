import '../stylesheets/MyModal.css'

const MyModal = ({children, visible, setVisible}) => {

    const styleClass = ['myModal']
    visible && styleClass.push('active')

    return (
        <div className={styleClass.join(' ') } onClick={() => setVisible(false)}>
            <div className='myModalContent' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal;