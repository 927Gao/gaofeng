import { Component } from "react";
import {
    Form,
    Checkbox,
    Input,
    Button,
    Tabs,
    Row, 
    Col,
    Radio
} from "antd";
import { UserOutlined, LockOutlined ,BarcodeOutlined} from '@ant-design/icons';
import {axios} from "&/axios";
import  EventEmitter from "events";
const myEvent = new EventEmitter();



import "./index.scss";

const { TabPane } = Tabs;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
      offset: 4,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
  const Zhulayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const zhutailLayout = {   // button 
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default class Login extends Component{

    handleChangeTab = (value)=>{
        console.log(value)
        this.setState({
            activeKey:value
        })
    }

    state ={
        activeKey:"1"
    }
    render(){
        return(
            <div className="l-box">
                <div className="l-form">
                <Tabs defaultActiveKey="1" 
                activeKey={this.state.activeKey}
                onChange={this.handleChangeTab}>
                    <TabPane tab="密码登陆" key="1">
                      <LoginCom history={this.props.history}/>
                    </TabPane>
                    <TabPane tab="验证码登陆" key="2">
                        <YanCom/>
                    </TabPane>
                    <TabPane tab="注册" key="3">
                        <ZhuceCom handleChangeTab={this.handleChangeTab}/>
                    </TabPane>
                </Tabs>,
                </div>
            </div>
        )
    }
}

class LoginCom extends Component{
    formRef = React.createRef();


    constructor(){
        super();
        this.state ={
            type:0,
            initialValues:{
                type:0
            }
        }
    }
    componentDidMount(){
        myEvent.on("sendLoginMobile",mobile=>{
            console.log(mobile);
            // console.log(this)
            this.formRef.current.setFieldsValue({"mobile":mobile});
            // this.refs.mobile.state.value = mobile;  有问题
            // this.refs.mobile.onFocus();
        })
    }
    handleChangeType=(e)=>{
        console.log(e)
        this.setState({
            type:e.target.value
        })
    }
    onFinish = values => {
        console.log('Success:', values);
        axios.post("/react/login",values)
        .then(res=>{
            if(res.data.type){
                //登陆成功跳转主页
                sessionStorage.setItem("token",res.data.token)
                localStorage.setItem("users",JSON.stringify({
                    mobile:values.mobile,
                    Password:values.Password,
                }));
                this.props.history.push("/main")
            }else{

            }
        })
      };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    render(){
        return(
            <Form
            {...layout}
            name="basic"
            initialValues={this.state.initialValues}
            className="form"
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            >
            <Form.Item
                // label="手机号"
                name="mobile"
                rules={[
                {
                    required: true,
                    message: '请输入你的手机号',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="请输入手机号"
                ref="mobile"
                />
            </Form.Item>

            <Form.Item
                // label="密码"
                name="password"
                rules={[
                {
                    required: true,
                    message: '请输入你的密码',
                },
                ]}
            >
                <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码"/>
            </Form.Item>

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <Form.Item {...tailLayout} name="type" >
                    <Radio.Group value={this.state.type} onChange={this.handleChangeType}>
                        <Radio value={0}>普通用户</Radio>
                        <Radio value={1} >管理员</Radio>
                    </Radio.Group>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" className="login-btn">
                登录
                </Button>
            </Form.Item>
            </Form>
        )
    }
}
const mReg = /^1(3|4|5|7|8|9)\d{9}$/;
const cReg =/^\d{4}$/
let timer = null;
const num =12;
class YanCom extends Component{
    state ={
        count:num,
        mDisable:true,
        cDisable:true,
        txt:"获取验证码"
    }
    handleSendSms=()=>{
        console.log(this)
        this.handleountDown();
        axios.get("http://47.104.209.44:3333/captcha/sent",{
            params:{
                phone:this.mobile.state.value
            }
        }).then(res=>{

        })
    }
    handleountDown=()=>{
        timer = setInterval(() => {
            if(this.state.count>1){
                this.state.count--;
                this.setState({
                    count:this.state.count,
                    txt:`倒计时 ${this.state.count} S`,
                    mDisable:true,
                })
            }else{
                clearInterval(timer);
                timer = null;
                this.setState({
                    count:12,
                    txt:`获取验证吗`,
                    mDisable:false,
                })
            }
        }, 1000);
    }
    handleCheckMobile=(e)=>{
        e.persist();
        // var mobile = this.mobile.state.value;
        this.setState({
            mDisable:!mReg.test(e.target.value),
            cDisable:!(mReg.test(e.target.value))
            // &&cReg.test(this.code.state.value)
        })
    }
    handleCheckSms=()=>{
        axios.get("http://47.104.209.44:3333/captcha/verify",{
            params:{
                phone:this.mobile.state.value,
                captcha:this.code.state.value,
            }
        }).then(res=>{

        })
    }
    // hanleTestCode = (e)=>{
    //     console.log(e.target.value);
    //     this.setState({
    //         cDisable:!(cReg.test(e.target.value)&&cReg.test(this.code.state.value))
    //     })
    // }
    render(){
        const{
            mDisable,
            cDisable,
            txt
        }=this.state
        return(
            <div className="l-sms form">
                <Row className="c-top">
                    <Col span={16} offset={4} >
                        <div className="sms-box">
                            <Input
                            prefix={<UserOutlined />}
                            placeholder = "请输入手机号"
                            ref={el=>this.mobile=el}
                            onChange={this.handleCheckMobile}
                            />
                            <Button 
                            disabled={mDisable}
                            onClick={this.handleSendSms} type="primary">{txt}</Button>
                        </div>
                    </Col>
                </Row>
                <Row className="c-top">
                    <Col span={16} offset={4}>
                        <Input
                        prefix={<BarcodeOutlined />}
                        placeholder = "请输入验证码"
                        ref={el=>this.code=el}
                        // onChange={this.hanleTestCode}
                        />
                    </Col>
                </Row>
                <Row className="c-top">
                    <Col span={16} offset={4}>
                        <Button 
                         disabled={cDisable}
                        onClick={this.handleCheckSms} type="danger" className="login-btn">立即登陆</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
const ZhuceCom = ({handleChangeTab})=>{
    const [form] = Form.useForm()
    const onFinish = values => {
        console.log('Success:', values);
        axios.post("/react/register",values)
        .then(res=>{
            if(res.data.type){
                // 注册成功，跳转登陆 将手机号带过去
                setTimeout(()=>{
                    handleChangeTab("1");

                    myEvent.emit("sendLoginMobile",res.data.result[0].mobile);
                },1000)
            }else{
                // 注册失败启动重置
                form.resetFields();
            }
        })
      };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    const handleReset = ()=>{
          form.resetFields();
      }
        return(
            <Form
            {...Zhulayout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            form={form}
            className="form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="手机号"
                name="mobile"
                rules={[
                {
                    required: true,
                    message: '请输入你的手机号',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="用户名"
                name="username"
                rules={[
                {
                    required: true,
                    message: '请输入你的用户名',
                },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                label="密码"
                name="password"
                rules={[
                {
                    required: true,
                    message: '请输入你的密码',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                label="确认密码"
                name="confirmpwd"
                rules={[
                {
                    required: true,
                    message: '请输入确认密码',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item {...zhutailLayout}>
                <Button type="danger" htmlType="submit" className="zhu-btn">
                注册
                </Button>
                <Button type="primary" htmlType="button" onClick={handleReset} className="zhu-btn">
                重置
                </Button>
            </Form.Item>
            </Form>
        )
}