import React from 'react'

const Banner_category = (props) => {
    
    return (
        
            <div class={`banner-box banner-box--${props.bannerName}`} >
                <h1 class="heading-primary">{props.bannerName}</h1>
            </div>
        
    )
}
 
export default Banner_category
