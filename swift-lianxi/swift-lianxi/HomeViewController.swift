//
//  HomeViewController.swift
//  swift-lianxi
//
//  Created by GMAR on 2017/5/15.
//  Copyright © 2017年 港棉纺织. All rights reserved.
//

import UIKit



class HomeViewController: UIViewController,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout {
    @IBOutlet weak var HomeCollectionView: UICollectionView!

    override func viewDidLoad() {
        super.viewDidLoad()
        let layout = UICollectionViewFlowLayout();
        HomeCollectionView.collectionViewLayout=layout;
        HomeCollectionView?.register(HomeCollectionViewCell.self, forCellWithReuseIdentifier: "HomeCollectionViewCell")
        HomeCollectionView?.delegate = self;
        HomeCollectionView?.dataSource = self;
        HomeCollectionView?.backgroundColor = UIColor.white;
        layout.itemSize = CGSize(width:UIScreen.main.bounds.width/2-5, height:100);
        self.view.addSubview(HomeCollectionView!);
    
        
    }

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 20;
    }
    
    func collectionView(_ collectionView:UICollectionView,cellForItemAt indexPath:IndexPath)->UICollectionViewCell{
    
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "HomeCollectionViewCell", for: indexPath) as!HomeCollectionViewCell;
        cell.title?.text = "不一样咯";
        return cell;
    }

//    func collectionView(_ collectionView: UICollectionView, willDisplay cell: UICollectionViewCell, forItemAt indexPath: IndexPath) {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, didEndDisplaying cell: UICollectionViewCell, forItemAt indexPath: IndexPath) {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
//        
//    }
//    
//    func collectionView(_ collectionView: UICollectionView, shouldSelectItemAt indexPath: IndexPath) -> Bool {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, canFocusItemAt indexPath: IndexPath) -> Bool {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, moveItemAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, transitionLayoutForOldLayout fromLayout: UICollectionViewLayout, newLayout toLayout: UICollectionViewLayout) -> UICollectionViewTransitionLayout {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, performAction action: Selector, forItemAt indexPath: IndexPath, withSender sender: Any?) {
//        
//    }
//    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
//        
//    }
//    func indexTitles(for collectionView: UICollectionView) -> [String]? {
//        
//    }
    
    
//    - (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath{
//    
//    return CGSizeMake(viewWidth/3-2, viewWidth/3);
//    }
//    
//    #pragma mark - 定义每个UICollectionView 的 margin
//    - (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section{
//    
//    return UIEdgeInsetsMake(1, 1, 15, 1);
//    }
}

class HomeCollectionViewCell: UICollectionViewCell {
    
    var title : UILabel?;
    
    override init(frame: CGRect) {
        super.init(frame: frame);
        
        self.title = UILabel(frame:CGRect(x: 30, y: 0, width: UIScreen.main.bounds.width, height: 50))
        self.title?.textColor = UIColor.black
        self.addSubview(self.title!)
        self.title?.text = "哈哈哈"
        self.backgroundColor = UIColor.blue
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("初始化失败");
    }
}
