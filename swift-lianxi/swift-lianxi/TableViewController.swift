//
//  TableViewController.swift
//  swift-lianxi
//
//  Created by GMAR on 2017/5/16.
//  Copyright © 2017年 港棉纺织. All rights reserved.
//

import UIKit

var identity = "TabelCell"
let screenw = UIScreen.main.bounds.width
let screenh = UIScreen.main.bounds.height


class TableViewController: UIViewController,UITableViewDelegate,UITableViewDataSource {

    override func viewDidLoad() {
        super.viewDidLoad()

        initSuview()
    }
    
    fileprivate func initSuview(){
    
        tableView.delegate = self;
        tableView.dataSource = self;
        self.view.addSubview(tableView)
    }

    fileprivate var tableView:UITableView = {
    
        let tabel = UITableView (frame:CGRect(x:0,y:0,width:screenw,height:screenh),style:.plain)
        tabel.backgroundColor = UIColor.white
        tabel.register(TabelCell.self, forCellReuseIdentifier: identity)
        tabel.tableFooterView = UIView()
        tabel.separatorStyle = .none
        tabel.rowHeight = 70
        return tabel
    }()
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 10;
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: identity, for: indexPath)
        cell.selectionStyle = .none
        return cell;
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let vc = ViewController()
        vc.cateName = "hbjb"
        vc.value = 10
        vc.arr = ["1","2","3"]
        self.navigationController?.pushViewController(vc, animated: true)
    }
}

class TabelCell: UITableViewCell {
    
    func initSuView(){
    
        
        self.addSubview(nameLabel)
        self.addSubview(iconImage)
        
        nameLabel.frame = CGRect(x:iconImage.frame.maxX+10,y:10,width:100,height:20)
    }
    
    let nameLabel:UILabel = {
    
        let label = UILabel()
        
        label.text = "henhaolo"
        
        return label;
    }()
    
    let iconImage:UIImageView = {
    
        let icon = UIImageView(frame:CGRect(x:10,y:10,width:50,height:50))
        icon.backgroundColor = UIColor.red
        return icon
    }()
    
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super .init(style: style, reuseIdentifier: reuseIdentifier)
        
        initSuView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError()
    }
}
