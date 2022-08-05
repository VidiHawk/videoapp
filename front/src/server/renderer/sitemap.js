import React from 'react';
import config from './../../config/index';
import fetch from "isomorphic-fetch";

const baseUrl = config.API_BASE_URL;
const lastMod = getCurrentTime(); 

export default (req, res) => {
    let sitemap = req.params.sitemap;
    switch(sitemap){
        case 'sitemap':
            let xmlData =  getIndexSitemapXML();
            res.status(200).send(xmlData);

        break;
        case 'sitemap-menu':
            getAllMenusXML().then( (xmlData) => {                
                res.status(200).send(xmlData);
            }); 
        case 'sitemap-videos':
            getAllVideosXML().then( (xmlData) => {                
                res.status(200).send(xmlData);
            }); 
        break;
        default:
    }      
}


/**
 * index sitemap schema, that have 3 sitemaps urls
 * @author Anshu Singh <anshu17singh@gmail.com>
 */

 function getIndexSitemapXML(){
    return `<?xml version="1.0" encoding="UTF-8" ?>  
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">        
            <sitemap> 
                <loc>${config.BASE_URL}/sitemap-menu.xml</loc>
            </sitemap>
            <sitemap> 
                <loc>${config.BASE_URL}/sitemap-videos.xml</loc>
            </sitemap>  
            <sitemap> 
            <loc>${config.BASE_URL}/sitemap-videos.xml</loc>
        </sitemap>  
        </sitemapindex>
    `;
}



/** sitemap-menu.xml 
 * website xml that have add menus and sub menus
 * @author Anshu Singh <anshu17singh@gmail.com>
 */
async function getAllMenusXML() {

    let htmlData = `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">`;
        
    let _api_url = `${baseUrl}/v1/menu/fetch`;
    let apiResponse = await getApiResult(_api_url);
    const allMenus = apiResponse?.result?.list || []
    if(allMenus.length){
        const ssrMenus = allMenus.filter(menu=>!menu.isUserMenu);
        let siteurl = config.BASE_URL
        if(ssrMenus.length){
            for(let i=0; i<ssrMenus.length; i++){
                let list = ssrMenus[i];
                htmlData += `<url>`;    
                htmlData += `<loc>${siteurl}/${list.slug}</loc>`;
                htmlData += `<lastmod>${list.updatedAt}</lastmod>`;  
                htmlData += `<changefreq>daily</changefreq>`; 
                htmlData += `<priority>0.8</priority>`;   
                htmlData += `</url>`;
                if(list?.child?.list?.length){
                    const childList = list.child.list;
                    if(childList.length){
                        for(let i=0; i<childList.length; i++){
                            let childlist = childList[i];
                            htmlData += `<url>`;    
                            htmlData += `<loc>${siteurl}/${list.slug}/${childlist.slug}</loc>`;
                            htmlData += `<lastmod>${childlist.updatedAt}</lastmod>`;   
                            htmlData += `<changefreq>daily</changefreq>`; 
                            htmlData += `<priority>0.8</priority>`;  
                            htmlData += `</url>`;
                        }
                    }
                }

            }
        }
    }
    htmlData += `</urlset>`;
    return htmlData;       
}


/** sitemap-videos.xml 
 * website xml that have all video URLs along with video content
 * @author Anshu Singh <anshu17singh@gmail.com>
 */
 async function getAllVideosXML() {

    let htmlData = `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
        
    let _api_url = `${baseUrl}/v1/sitemap`;
    let apiResponse = await getApiResult(_api_url);
    const allVideos = apiResponse?.result || []
    if(allVideos.length){
        let siteurl = config.BASE_URL
        if(allVideos.length){
            for(let i=0; i<allVideos.length; i++){
                let list = allVideos[i];

                htmlData += `<url>`;    
                htmlData += `<loc>${siteurl}/${list.parentCategorySlug}/${list.categorySlug}/${list.slug}</loc>`;
                htmlData += `<video:video>`; 
                htmlData += `<video:thumbnail_loc>${list.poster}</video:thumbnail_loc>`;  
                htmlData += `<video:title>${list.name}</video:title>`;  
                htmlData += `<video:description>${list.name}</video:description>`;  
                htmlData += `<video:content_loc>${list.videoPath}</video:content_loc>`;  
                htmlData += `<video:publication_date>${list.createdAt}</video:publication_date>`;  
                htmlData += `<video:family_friendly>yes</video:family_friendly>`;  
                htmlData += `<video:live>no</video:live>`;  
                htmlData += `</video:video>`; 
                htmlData += `</url>`;
            }
        }
    }
    htmlData += `</urlset>`;
    return htmlData;       
}


/**
 * fetch the data through  API
 * @param {*} url 
 * @author Anshu Singh <anshu17singh@gmail.com>
 */
async function getApiResult(url){
    let res = {};
    let options = {
        method: 'GET',
        headers: getHeader(),
    }
    try{
        res = await fetch(url, options);
    } 
    catch (e){
        return Promise.reject(e)
    }
    res = await res.json();
    return res;
}

function getHeader(){
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Bot-Request": 1,
        "site-id" : config.SITE_ID
    }
}

function getCurrentTime() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}