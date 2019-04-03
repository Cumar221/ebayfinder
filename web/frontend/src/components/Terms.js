import React, { Component } from "react";
import Toolbar from "./Toolbar";
import SideNav from "./SideNav";
import Shadow  from "./Shadow";


export default class Terms extends Component {
    constructor(props) {
      super(props);
      this.state = {
        navOpen: false,
        logged_in: localStorage.getItem('token') ? true : false,
      };
    }

    scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.setState({scroll: 'none'})
    }

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, navOpen: false});
        if (this.state.socket != null && this.state.socket.readyState === WebSocket.OPEN) {
          this.state.socket.close();
        }
    };

    openNav = () => {
        this.setState((prevState) =>{
          return {navOpen: !prevState.navOpen};
        })
      }
    
    closeNav = () =>{
        this.setState({navOpen: false})
    }  
    render() {
        let shadow
  
        if (this.state.navOpen){
            shadow = <Shadow click={this.closeNav}/>
        }
      return (
            <React.Fragment>
            <Toolbar user={this.state.username} logout={this.handle_logout} logged_in={this.state.logged_in} click={this.openNav}/>
            <SideNav logout={this.handle_logout} logged_in={this.state.logged_in} show={this.state.navOpen} click={this.openNav}/>
            {shadow}     
            <div className="banner1"></div>
            <div style={{color: 'white', textAlign: '-webkit-center'}}>
                <div className="services"> 
                    <div className="wthree_services_grid"> 
                        <div className="col-s-8 col-lg-8 wthree_services_left2" style={{textAlign: 'left'}}> 
                            <h1>Terms of Service</h1> 
                            <hr/> <h4>OVERVIEW</h4> 
                            <p> Lazyperks (web site and mobile application) is operated by Texriver, Inc. 
                                Throughout the agreement, the terms “we”, “us” and “our” refer to Texriver, Inc. and term “site” refer 
                                to both web site and mobile application. Texriver, Inc. offers this site, including all information, tools and 
                                services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, 
                                policies and notices stated here. By visiting our site and/or purchasing something from us, you engage in our “Service”
                                and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional 
                                terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all
                                users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or 
                                contributors of content. Please read these Terms of Service carefully before accessing or using our site. By accessing 
                                or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms 
                                and conditions of this agreement, then you may not access the site or use any services. If these Terms of Service are 
                                considered an offer, acceptance is expressly limited to these Terms of Service. Any new features or tools which are 
                                added to the current store shall also be subject to the Terms of Service. You can review the most current version of the 
                                Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of 
                                Service by posting updates and/or changes to our site. It is your responsibility to check this page periodically for changes.
                                Your continued use of or access to the site following the posting of any changes constitutes acceptance of those changes.
                            </p> 
                            <p> For duration of Beta period all Beta versions of application and more generally any Test Contents are supplied to you 'as is' 
                                and 'according to availability' without any explicit or implicit guarantee of any kind.You use beta version at your own risk. 
                                You accept that (i) the application may include known or unknown bugs; that (ii) the application may be available only on 
                                subscription once the beta phase is completed or at any other time subsequently; and (iii) your data in the application may be 
                                erased at any time. 
                            </p> 
                            <h4>SECTION 1 – USE OFSERVICE</h4> 
                            <p> By agreeing to these Terms of Service, you represent that you 
                                are at least the age of majority in your state or province of residence, or that you are the age of majority in your state 
                                or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                            </p>
                            <p> You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws 
                                in your jurisdiction (including but not limited to copyright laws).
                            </p> 
                            <p> A breach or violation of any of the Terms will result 
                                in an immediate termination of your Services. 
                            </p> 
                            <h4>SECTION 2 - GENERAL CONDITIONS</h4> 
                            <p> We reserve the right to refuse service to anyone for any reason at any time. 
                            </p> 
                            <p> You understand that your content (not including credit card information), may be transferred unencrypted and involve(a) transmissions 
                                over various networks; and(b) changes to conform and adapt to technical requirements of connecting networks or devices.Credit card 
                                information is always encrypted during transfer over networks. 
                            </p> 
                            <p> You agree not to reproduce, duplicate, copy, sell, resell or 
                                exploit any portion of the Service, use of the Service, or access to the Service or any contact on the site through which the service is provided,
                                without express written permission by us. 
                            </p> 
                            <p> The headings used in this agreement are included for convenience only and will not limit or 
                                otherwise affect these Terms.
                            </p> 
                            <h4>SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h4> 
                            <p> We are not responsible if information made available on this site is not accurate, complete or current.The material on this site is provided 
                                for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, 
                                more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
                            </p> 
                            <p> This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. 
                                We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that 
                                it is your responsibility to monitor changes to our site. 
                            </p> 
                            <h4>SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h4> 
                            <p> Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content 
                                thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of 
                                the Service.
                            </p> 
                            <h4>SECTION 5 - PRODUCTS OR SERVICES</h4> 
                            <p> We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise 
                                this right on a case-by-case basis.We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or 
                                product pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any product or service at any
                                time.Any offer for any product or service made on this site is void where prohibited. 
                            </p> 
                            <p> We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any 
                                errors in the Service will be corrected. 
                            </p>
                            <h4>SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h4> 
                            <p> We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
                                These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. 
                                In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the 
                                order was made. 
                            </p> 
                            <h4>SECTION 7 - OPTIONAL TOOLS</h4> 
                            <p> We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools
                                “as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating 
                                to your use of optional third-party tools. 
                            </p> 
                            <p> Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which 
                                tools are provided by the relevant third-party provider(s). 
                            </p> 
                            <p> We may also, in the future, offer new services and/or features through the site(including, the release of new tools and resources). Such new features and/or services shall also be subject 
                                to these Terms of Service. 
                            </p> 
                            <h4>ECTION 8 - THIRD-PARTY LINKS</h4> 
                            <p> Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party sites that are not 
                                affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party 
                                materials or sites, or for any other materials, products, or services of third-parties. 
                            </p>
                            <p> We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party sites. 
                                Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding
                                third-party products should be directed to the third-party. 
                            </p> 
                            <h4>SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h4> 
                            <p> If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials,
                                whether online, by email, by postal mail, or otherwise(collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise 
                                use in any medium any comments that you forward to us. We are and shall be under no obligation(1) to maintain any comments in confidence; (2) to pay compensation for any comments; or(3) to respond 
                                to any comments. 
                            </p>
                            <p> We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise
                                objectionable or violates any party’s intellectual property or these Terms of Service. 
                            </p> 
                            <p> You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right.You further agree that your comments 
                                will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related site. 
                                You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you 
                                make and their accuracy.We take no responsibility and assume no liability for any comments posted by you or any third-party. 
                            </p> 
                            <h4>SECTION 10 - PERSONAL INFORMATION</h4> 
                            <p> Your submission of personal information through the store is governed by our Privacy Policy. </p> 
                            <h4>SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS</h4> 
                            <p> Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, 
                                product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information 
                                in the Service or on any related site is inaccurate at any time without prior notice (including after you have submitted your order). 
                            </p> 
                            <p> We undertake no obligation to update, amend or clarify information in the Service or on any related site, including without limitation, pricing information, except as required by law.No specified update or 
                                refresh date applied in the Service or on any related site, should be taken to indicate that all information in the Service or on any related site has been modified or updated. 
                            </p> 
                            <h4>SECTION 12 - PROHIBITED USES</h4> 
                            <p> In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate 
                                in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the 
                                intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national 
                                origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality 
                                or operation of the Service or of any related site, other sites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for 
                                any obscene or immoral purpose; or(k) to interfere with or circumvent the security features of the Service or any related site, other sites, or the Internet.We reserve the right to terminate your use of the Service 
                                or any related sites for violating any of the prohibited uses. 
                            </p> 
                            <h4>SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h4> 
                            <p> We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant that the results that may be obtained from the use of the service will 
                                be accurate or reliable. You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you. 
                            </p> 
                            <p> You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) 
                                provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, 
                                merchantable quality, fitness for a particular purpose, durability, title, and non-infringement. 
                            </p> 
                            <p> In no case shall Texriver, Inc., our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, 
                                incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, 
                                tort(including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, 
                                including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content(or product) posted, transmitted, or otherwise made available via 
                                the service, even if advised of their possibility.Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability 
                                shall be limited to the maximum extent permitted by law. 
                            </p>
                            <h4>SECTION 14 - INDEMNIFICATION</h4> 
                            <p> You agree to indemnify, defend and hold harmless Texriver, Inc.and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees,
                                harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or
                                the rights of a third-party. 
                            </p> 
                            <h4>SECTION 15 - SEVERABILITY</h4> 
                            <p> In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall 
                                be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions. 
                            </p> 
                            <h4>SECTION 16 - TERMINATION</h4> 
                            <p> The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. </p> 
                            <p> These Terms of Service are effective unless and until terminated by either you or us.You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site. </p> 
                            <p> If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts 
                                due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof). 
                            </p> 
                            <h4>SECTION 17 - ENTIRE AGREEMENT</h4> 
                            <p> The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. </p> 
                            <p> These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior 
                                or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service). 
                            </p>
                            <p> Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party. </p> 
                            <h4>SECTION 18 - GOVERNING LAW</h4> 
                            <p> These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of P.O. Box 1062, Cedar Park, TX, 78630-1062, United States. </p> 
                            <h4>SECTION 19 - CHANGES TO TERMS OF SERVICE</h4>
                            <p> You can review the most current version of the Terms of Service at any time at this page. </p> 
                            <p> We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our site. It is your responsibility to check our site periodically for changes. Your continued use 
                                of or access to our site or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes. </p> 
                            <h4>SECTION 20 - CONTACT INFORMATION</h4> 
                            <p> These Terms can be accessed at any time at www.lazyperks.com/terms. For any question concerning these Terms of the Services, you may contact TEXRIVER, INC at contact@texriver.com or on texriver.com </p> 
                            <p> ANY USE OF THE SERVICES IMPLIES UNRESERVED APPROVAL OF THESE TERMS AND TEXRIVERS'S PRIVACY POLICY. </p> 
                        </div> 
                        <div className="col-s-2 col-lg-2 wthree_services_left2"> </div> 
                        <div className="clearfix"> </div> 
                    </div> 
                </div>
                <div className="footer"> 
                    <div className="footer-copy"> 
                        <div className="w3agile_footer_grids row"> 
                            <div className="w3agile_footer_grid col-sm-4 col-md-4 "> 
                                <h3>About Us</h3> 
                                <p> Texriver, Inc. is the boutique software development company that specializes in eBay real-time data acquisition and data processing, enhancing eBay sellers and buyers experience and bottom line. <br/> 
                                    Our product is LAZYPERKS™ - #1 eBay bargain hunting machine, where you create your custom searches (desired price and description) and be notified as soon as the matching item is listed on eBay. 
                                    We call it a goldmine for collectors and resellers.
                                </p> 
                            </div> 
                            <div className="w3agile_footer_grid col-sm-4 col-md-4 "> 
                                <h3>Contact Info</h3> 
                                <ul> 
                                    <li><i className="fa fa-map-marker" aria-hidden="true"></i>P.O. Box 1062, <span>Cedar Park, TX</span><span>78630-1062</span></li> 
                                    <li><i className="fa fa-envelope" aria-hidden="true"></i><a href="mailto:contact@lazyperks.com">contact@lazyperks.com</a> </li> 
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>+1-512-730-1739</li> 
                                </ul> 
                            </div> 
                            <div className="w3agile_footer_grid w3agile_footer_grid1 col-sm-4 col-md-4 "> 
                                <h3>Navigation</h3> 
                                <ul>
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/contact">Contact Us</a> </li> 
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/terms">Trems of Services</a> </li> 
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/privacy">Privacy Policy</a> </li> 
                                    <li> <span className="fa fa-chevron-right" aria-hidden="true"></span><a href="/about">About</a> </li> </ul> 
                            </div> 
                            <div className="clearfix"> </div> 
                        </div> 
                    </div> 
                    <div className="copy-right-social"> 
                        <div className="footer-pos"> 
                            <a onClick= {this.scrollToTop} className="scroll"> <span></span> </a> 
                        </div> 
                        <div className="copy-right"> 
                            <p> © <a href="http://www.texriver.com" target="_blank"> 2014 - 2019 Texriver, Inc.</a> 
                               
                            </p> 
                        </div>
                         <div className="copy-right-social1"> 
                            <ul className="wthree_social_icons1"> 
                                <li> <a href="https://www.facebook.com/lazyperks" target="_blank" className="icon1 w3_facebook"> 
                                    <i className="fa fa-facebook" aria-hidden="true"></i> </a> </li> 
                                <li> <a href="https://twitter.com/lazyperks" target="_blank" className="icon1 w3_twitter"> 
                                    <i className="fa fa-twitter" aria-hidden="true"></i> </a> </li> 
                            </ul> 
                        </div>
                        <div className="clearfix"> </div> 
                    </div> 
                </div>
            </div>
            </React.Fragment>
        );
    }
  }