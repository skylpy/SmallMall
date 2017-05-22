//
//  LianxiViewController.swift
//  swift-lianxi
//
//  Created by GMAR on 2017/5/16.
//  Copyright © 2017年 港棉纺织. All rights reserved.
//

import UIKit

var tableCell = "TableViewCell"

class LianxiViewController: UIViewController,UITableViewDelegate,UITableViewDataSource {

    @IBOutlet weak var tabel: UITableView!
    let nameArr:Array = [["lin"],["lin","pei","yu"],["da","ge"]]
    override func viewDidLoad() {
        super.viewDidLoad()

        initSuView()

        automaticallyAdjustsScrollViewInsets = false
        
    }
    
    fileprivate func initSuView(){
        
        tabel.delegate = self
        tabel.dataSource = self
        tabel.separatorStyle = .none
        tabel.register(TableViewCell.self, forCellReuseIdentifier: tableCell)
        tabel.tableFooterView = UIView()
        
        let headerView = HeaderView(frame:CGRect(x:0,y:0,width:UIScreen.main.bounds.width,height:200))
        
        tabel.tableHeaderView = headerView
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return nameArr.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        let indexArr:Array = nameArr[section]
        return indexArr.count
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 0.01
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 10
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier:tableCell, for: indexPath) as! TableViewCell
        let indexArr:Array = nameArr[indexPath.section]
        let title:String = indexArr[indexPath.row]
        cell.iconImage.image = UIImage.init(named: title)
        cell.nameLabel.text = title
        cell.selectionStyle = .none
        
        return cell
    }
}

class TableViewCell: UITableViewCell {
    
    let iconImage:UIImageView = {
    
        let image = UIImageView(frame:CGRect(x:10,y:10,width:20,height:20))
        image.backgroundColor = UIColor.red
        
        return image
    }()
    
    let nameLabel:UILabel = {
    
        let label = UILabel()
        
        return label
    }()
    
    let lineView:UIView = {
    
        let lineView = UIView()
        lineView.backgroundColor = UIColor.lightGray
        
        return lineView
        
    }()
    
    func initSuview(){
    
        self.addSubview(iconImage)
        
        nameLabel.frame = CGRect(x:iconImage.frame.maxX+10,y:0,width:100,height:self.frame.height)
        self.addSubview(nameLabel)
        
        lineView.frame = CGRect(x:10,y:self.frame.maxY-1,width:UIScreen.main.bounds.width-20,height:1)
        self.addSubview(lineView)
    }
    
    
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super .init(style: style, reuseIdentifier: reuseIdentifier)
        
        initSuview()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError()
    }
}

class TableModel: NSObject {
    
    var icon:String?
    var title:String?
    
    func initTableModel(title:String,icon:String)->TableModel{
        
        let model = TableModel()
        model.icon = icon
        model.title = title
        return model
    }
    
}

class HeaderView: UIView {
    
    let iconImage:UIImageView = {
        
        let icon = UIImageView()
        icon.backgroundColor = UIColor.gray
        icon.layer.cornerRadius = 30
        icon.clipsToBounds = true
        return icon
    }()
    
    let nameLabel:UILabel = {
        
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 15)
        label.textAlignment = .center
        label.text = "linxiaozi"
        return label
    }()
    
    let desLabel:UILabel = {
    
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 13)
        label.textAlignment = .center
        label.text = "很哈 啦想死啊"
        return label
    }()
    
    func initSuview(){
    
        iconImage.frame = CGRect(x:self.bounds.width/2-30,y:self.bounds.height/2-30,width:60,height:60)
        self.addSubview(iconImage)
        
        nameLabel.frame = CGRect(x:0,y:iconImage.frame.maxY+10,width:UIScreen.main.bounds.width,height:20)
        self.addSubview(nameLabel)
        
        desLabel.frame = CGRect(x:0,y:nameLabel.frame.maxY+10,width:UIScreen.main.bounds.width,height:20)
        self.addSubview(desLabel)
    }
    
    override init(frame: CGRect) {
        super .init(frame: frame)
        
        self.backgroundColor = UIColor.blue
        
        initSuview()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}

