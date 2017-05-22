//
//  ViewController.swift
//  swift-lianxi
//
//  Created by GMAR on 2017/5/15.
//  Copyright © 2017年 港棉纺织. All rights reserved.
//

import UIKit


class ViewController: UIViewController {

    var cateName: String = ""
    var value: Int = 0
    var arr:Array<Any> = []
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor.white
        
        self.view.addSubview(bobyLabel)
        bobyLabel.text = String(format:"%@%d",cateName,value)
        
        
        arr.append("林")
        arr.append("培")
        arr.append("毓")
        var name:String = ""
        
        for i in 0..<arr.count{
            name = arr[i] as! String
            let label = UILabel ()
            label.frame = CGRect(x:0,y:i*100+100,width:100,height:30)
            label.text = String(format:"这个第%@个",name)
            
            self.view.addSubview(label)
            
            print(i)
        }
        
        
        
    }
    
    
    

    let bobyLabel:UILabel = {
    
        let label = UILabel(frame:CGRect(x:0,y:0,width:UIScreen.main.bounds.width,height:UIScreen.main.bounds.height))
        label.textAlignment = .center
        return label
    }()
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }


}

