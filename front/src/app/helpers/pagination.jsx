import React, {Fragment, useState, useEffect } from 'react';
import Loader from '../components/Common/Loader';
import { useContext } from 'react';
import authContext from './authContext';
import { getChildCategory } from './helpers';

export const Pagination = React.memo(function(props){
    const context = useContext(authContext);
    const [loading , setloading ] = useState(false);
    const { categorySlug } = props;
    const type = props.type || ''; 
    
    useEffect(() => {
        window['page'+type] = props.page;
        props.isPaginate && initiateObserver(type);
	}, [props.isPaginate, type])

	const initiateObserver = (slideType) => {
        const currentSubMenu = getChildCategory(props.location?.pathname || window.location.pathname)
        const elementClass = '.pagination-loader'+slideType;

        Util.Observe(elementClass, 100, ()=>{
            if(currentSubMenu == categorySlug){
                console.log('AM 100px', slideType, categorySlug);
                //loadMoreItems(props);
            }
        });
	}

	const loadMoreItems = (props) => {
        if(!loading){
            setloading(true);
            let params = props.actionParams;
            params.page = window['page'+type] + 1;

            props.loadMoreAction && props.loadMoreAction(params).then(()=>{
                window['page'+type] = params.page;
                setPagination(props);
                setloading(false);
                initiateObserver();
            })
        }
    }

    const setPagination = (props) => {
        if(props.pagination){
            //console.log(props)
        }
    }
    
    return(
		<Fragment>
            {props.children}
            <div className="clearfix"></div>
            {props.isPaginate && <Fragment>{(!loading) ? <div className={"pagination-loader"+type} style={{height:2}}></div> : <Fragment>{props.loaderComponent ? props.loaderComponent : <Loader style={{padding: '15% 40%'}}/>}</Fragment>}</Fragment>}
		</Fragment>
	)
});