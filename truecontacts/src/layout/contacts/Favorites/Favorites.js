import React, { useRef } from 'react';
import { Icon, Message, Placeholder } from 'semantic-ui-react';
import ImageThumb from '../../../components/ImageThumb/imagethumb';
import './style.css';

const Favorites = ({favorites, loading}) => {
  //console.log("Favorites: ", favorites);
  const listRef = useRef(null);

  const showIcons = favorites.length > 2;

  const scrollLeft = () => {
    if(listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: 500,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if(listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -500,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className='slide-container'>
      {showIcons && <Icon className="icon-class" name='chevron left' size='large' style={{marginBottom: '18px', marginRight: '10px'}} onClick={scrollLeft}></Icon>}
        {
          favorites?.length > 0 ? (
            <div className='items-container' ref={listRef}>
                {favorites.map((item, i) =>(
                    <div key={item._id} className="single-item-container">
                        <ImageThumb
                            firstname={item.firstname}
                            lastname={item.lastname}
                            src={item.profilePic}
                            style={{width: 60, height: 60}}
                        />
                      <p className='name'>{item.firstname}</p>
                    </div>
                ))}
            </div> ) : (
              <Message 
              header="No Favorites"
              content="no favorites to show"
              color="yellow"
              />
            )
        }

        { loading && (
            <>
              {" "}
              <Placeholder style={{marginLeft: '80px'}}>
                <Placeholder.Header>
                  <Placeholder.Line/>
                  <Placeholder.Line/>
                </Placeholder.Header>
              </Placeholder>
            </>
          )}

      {showIcons && <Icon className="icon-class" name='chevron right' size='large' style={{marginBottom: '18px', marginLeft: '10px'}} onClick={scrollRight}></Icon>}
    </div>
  )
}

export default Favorites;