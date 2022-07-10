import react from "react";
import validator from "validator";


class UrlList extends react.Component
{
    constructor(props){
        super(props)
        this.state = {urls: UrlList2(),valueChange:"",editClicked:[]}
        this.AddUrlButton = this.AddUrlButton.bind(this)
        this.UrlOnChangeInputBox = this.UrlOnChangeInputBox.bind(this)
        this.SortUrlList = this.SortUrlList.bind(this)
        this.removeUrl = this.removeUrl.bind(this)
        this.EditUrl = this.EditUrl.bind(this)
        this.UpdateUrl = this.UpdateUrl.bind(this)
    }
    UpdateUrl(e){
        if(validator.isURL(this.state.valueChange))
        {
            let index = e.target.value
            let url = e.target.name
            let tempUrllist = this.state.urls.filter((tempUrl) => tempUrl !== url)
            tempUrllist.splice(index,0,this.state.valueChange)
            let TempUrlFilter = this.state.editClicked.filter((tempUrl) => tempUrl !== url)
            this.setState({urls:tempUrllist,valueChange:"" ,editClicked:TempUrlFilter})
        }
        else{
            return(
                alert("please enter a valid address")
            )
        }
    }
    EditUrl(e){
        let tempIndex = e.target.name
        this.setState({editClicked:[...this.state.editClicked,tempIndex]})
    }
    removeUrl(e){
        let tempUrllist = this.state.urls.filter((tempUrl) => tempUrl !== e.target.value)
        this.setState({urls:tempUrllist})
    }
    SortUrlList(){
        let Sort = this.state.urls.sort((a,b) => {
            return(
                a.urls > b.urls ? 1:-1
                
            )
        })
        this.setState({urls:Sort})

    }

    UrlOnChangeInputBox(e){
        let change = e.target.value
        this.setState({valueChange : change})
    }

    AddUrlButton(){
        let tempstate = [...this.state.urls,this.state.valueChange]
        if (this.state.valueChange==="") {
            return(
                alert("please enter a url ")
            );
            
        }
        else{
            if(validator.isURL(this.state.valueChange))
            {
                if(this.state.urls.includes(this.state.valueChange))
                {
                    alert("this url is already exist please choose a different url ")
                }
                else{
                    this.setState({urls:tempstate,valueChange:"",urlValue:""})
                    alert("success ")
                }
            }
            else{
                alert("wrong input please insert a Valid Url")
            }
        }
    };
    render(){
        return(
                <div>
                    <h1>Urls</h1>
                    <input type = "text" value ={this.urlValue} placeholder="enter url" onChange={this.UrlOnChangeInputBox} />
                    <button onClick={this.AddUrlButton}>add url</button>
                    <button onClick={this.SortUrlList}>Sort</button>
                    <div>
                        <ul>
                            {this.state.urls.map((u,i)=> {
                                return(
                                    <li key={u}>{u} <span></span>
                                    <button value={u} onClick={this.removeUrl}>Remove</button>
                                    {this.state.editClicked.includes(u)===false && <button name ={u} value = {i} onClick={this.EditUrl} >Edit</button>}
                                    <div>
                                    {this.state.editClicked.includes(u)===true && <input value = {this.newUrl} onChange={this.UrlOnChangeInputBox} type="text" placeholder="enter new url"></input>}
                                    {this.state.editClicked.includes(u)===true && <button name ={u} value = {i} onClick={this.UpdateUrl} >Ok</button>}

                                    </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
        )
    }

}


export default UrlList

function UrlList2(){
    return(
      [
        'https://www.youtube.com/watch?v=A8lZP9mrGzU',
        'https://www.youtube.com/watch?v=y0EnIdmPeRs',
        'https://www.youtube.com/watch?v=6wLZyg9vBhs',
        'https://www.youtube.com/watch?v=VtlFWOifKcE'



      ]
    )
}