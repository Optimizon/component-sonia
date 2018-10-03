var fs = require('fs');
const csvWriter = require('csv-write-stream')
require('events').EventEmitter.prototype._maxListeners = 11;


const randomDescription = () => {
	var sentences = [ 'Neque quod tempore temporibus doloremque ipsum doloremque nisi quod. Vitae earum enim provident. Odio expedita eum architecto aut eveniet voluptas suscipit. Et modi et est molestias. Voluptatem debitis atque ut dicta nemo adipisci eum. Repudiandae quis itaque ut architecto tempora omnis nesciunt.',
  'Optio blanditiis quam possimus earum aut corporis dolorem consectetur totam. Quia est eveniet at dolor qui error cumque delectus.',
  'Repellendus assumenda necessitatibus provident aut. Alias possimus modi molestiae. Veritatis officiis autem.',
  'Fugit in a ut veritatis nostrum doloribus pariatur. Non distinctio rem. Debitis illum et eveniet est molestiae.',
  'Et enim sed. Quos nemo qui nesciunt. Voluptatem culpa totam est maiores fuga quasi vitae.',
  'Molestiae at fuga quia ut. Hic quo accusamus dolorem nisi. Ut incidunt beatae ab aut incidunt. Est exercitationem aut dolorem nostrum dolor mollitia. Beatae quas officia in minima assumenda distinctio. Cupiditate dolorem quo magni fugit.',
  'Architecto eveniet est alias aut nesciunt quaerat. Ut non aut quis. Rerum rerum illum. Eligendi voluptatem voluptatibus.',
  'Quos inventore accusamus hic distinctio sunt esse est. Vel non est quidem error. Asperiores culpa dolore voluptate cum dolor. Id mollitia aut impedit minus. Nihil doloremque inventore.',
  'Quas itaque possimus hic. A eum id odio dicta consectetur.',
  'Deleniti recusandae repellendus. Ut id et excepturi qui. Recusandae rem fuga cumque aut reiciendis illo et. Quidem eveniet cumque provident illum. Nulla et tempore aut commodi totam dolor.',
  'A saepe aliquam autem repellendus sed ut molestiae sed aliquid. Dolor id cupiditate quos fuga distinctio. Optio voluptatem dolore nisi cum. Quasi blanditiis ipsam dolorem architecto rerum est beatae.',
  'Rerum ex magnam nesciunt dolores non eligendi sed. Dolor et perferendis nobis adipisci ipsam qui placeat adipisci. Id ex dolor ad rerum nemo. Voluptates omnis velit inventore.',
  'Sequi porro voluptatibus quam nesciunt magnam. Dolores ratione voluptatem delectus. Quae perspiciatis omnis qui praesentium. Voluptate dicta facere consequatur.',
  'Quos odit sunt omnis veniam. Rerum consequatur sequi. Qui qui dolor rem adipisci et.',
  'Aut consequatur nihil odit itaque dolore labore unde. Consequuntur at exercitationem delectus nam. Corporis assumenda itaque incidunt et recusandae et commodi aut quibusdam. Facere quaerat alias voluptas ut quidem aliquid. Omnis reprehenderit consequatur dolorem sit ratione aut labore deleniti eos.',
  'Non ipsa praesentium nihil ducimus officia nemo consequatur. Dolores earum consectetur. Veniam quia officiis. Quia voluptatem eligendi doloribus officiis ut.',
  'Aut odit veniam suscipit aut. Numquam laborum praesentium laborum dicta. Quisquam nam ipsam quisquam qui accusamus odio magnam nam iste. Tenetur inventore sit nisi non doloribus quos ex nulla. Voluptas possimus excepturi nisi et eaque. Est hic assumenda temporibus magni.',
  'Earum possimus ea et magni. Aspernatur doloremque modi alias nesciunt. Est doloremque praesentium ut quos. Laborum quos aspernatur aut omnis qui voluptatem. Et sed modi amet alias corrupti sint rerum.',
  'Sed dolores voluptas asperiores deserunt eum eos voluptatibus. Laboriosam quia ex. Iste minus at quidem ea perspiciatis.',
  'Est doloremque harum cupiditate laborum. Harum in blanditiis alias ut consequatur et vero neque accusantium. Architecto iure nulla et qui suscipit quae sequi. Nisi voluptates veritatis aut non qui quisquam. Rerum pariatur saepe non totam aut corrupti modi.',
  'Quaerat nihil earum reiciendis ab quia perspiciatis fuga quo minus. Perspiciatis est asperiores.',
  'Perferendis corporis quia in debitis. Porro soluta adipisci. In tempore eveniet delectus.',
  'In est repellat eos eligendi optio atque labore nihil. Commodi porro tempora ullam dolor eveniet error omnis. Dolorem et et eos eum reiciendis. Et quis voluptatem cumque consequatur ea.',
  'Ab ut omnis vitae distinctio similique necessitatibus et. Numquam in alias consequatur et sint et cumque. Qui temporibus non tempora quae sit deserunt ipsum sint. Dolor alias reprehenderit repellendus consectetur eum nam voluptas culpa. Reiciendis ipsam non odit in. Magni dolore rerum atque explicabo.',
  'Dolorem ipsam quia fugit sint similique quam dolore sequi libero. Illum voluptas ut dolorem dignissimos. Praesentium esse et quo mollitia tenetur consectetur provident et natus. Facere libero sequi reiciendis blanditiis doloribus assumenda omnis. Corrupti velit dicta voluptas.',
  'Officia ipsum et consequuntur aut quae. Similique commodi tempora nemo quidem ex facilis et. Occaecati perspiciatis dolorem iusto adipisci voluptas. Numquam eum recusandae voluptatem.',
  'Inventore et ducimus earum similique alias. Et deserunt optio reprehenderit sed quasi animi aut. Reprehenderit reprehenderit debitis fugiat vel quo minima accusantium. Voluptas impedit ut. Ex vero nihil ut.',
  'Assumenda expedita cum nulla dolorum. Eum adipisci commodi ab. Fuga velit ad a recusandae. Sed qui consequatur optio. Nemo autem dolores.',
  'Molestias ipsa alias est molestiae aut magnam in aut. Blanditiis et molestiae sed voluptates id. Aliquid et in. Autem ipsam necessitatibus omnis voluptatem. Exercitationem et quidem dolorem consequuntur quia. Odio rerum sapiente rerum nostrum repudiandae tenetur voluptatem est.',
  'Molestias itaque iure laudantium explicabo aut consequatur. Debitis blanditiis aut ducimus ea cum fugit. Mollitia aperiam placeat. Porro culpa modi inventore vero praesentium est quas quo.',
  'Sed veritatis eos quod qui. Ut eos ducimus qui aut sint minus aut. Aut ipsum dolores.',
  'Nostrum qui quas. Aut earum dolor ab excepturi id facilis. Eveniet eveniet dolor vitae aut. Tempore consequuntur consequatur distinctio perferendis non. Et repellat nihil.',
  'Omnis exercitationem iusto eum provident aut aut molestias ipsam omnis. Porro unde non neque est beatae. Facilis esse maiores harum.',
  'Quibusdam optio maiores quasi vel minima in. Ut corporis tempora doloribus iure doloremque officia et et. Reprehenderit qui aperiam id. Ipsam ducimus sit dolorem.',
  'Esse id corrupti occaecati expedita. Sit rerum voluptas quidem quia. Amet odio error non similique voluptatem deserunt sit officiis.',
  'Molestiae inventore dignissimos nihil blanditiis et. At inventore in ut sit deleniti aliquid ut.',
  'Cum commodi quia voluptas dolore quibusdam amet voluptatem. Repellat mollitia minima eius tenetur eius reiciendis. Nulla illum excepturi qui non officia nesciunt corporis ullam perspiciatis.',
  'Voluptatem qui inventore dolore dolorem. Sed consequatur accusantium magni nobis et sed dolore. Sunt tenetur quaerat alias velit ab. Suscipit animi amet excepturi.',
  'Saepe deserunt quasi et rem. Quae corporis nemo et. Qui et cumque impedit expedita eligendi ipsum quidem. Molestiae itaque officiis quos. Nulla alias sed. Quae qui a.',
  'Enim in voluptatem quo. Et distinctio vitae.',
  'Est sit eos numquam dolor. Cum et qui eum eum pariatur velit. Ullam fuga rem. Similique repellat qui. Autem quam et dolores et neque enim.',
  'Commodi veniam et quia quasi fugiat aspernatur est. Quibusdam ullam quas ut corporis totam sit accusantium ut. Qui debitis ea est.',
  'Natus repudiandae odit non ipsum quia dicta molestiae temporibus aut. Quo veniam dolores. Et earum mollitia quo est a sed. Vitae tenetur nesciunt. Consequuntur id dolorem maiores suscipit voluptatum.',
  'Unde aut delectus rerum. Quia qui est dignissimos qui enim provident molestiae cum. Sed neque eos quo quia eum reprehenderit. Quae maiores reiciendis tempora beatae explicabo itaque unde. Quia in velit asperiores excepturi soluta id unde deleniti.',
  'Deleniti iste aperiam. Aperiam non numquam sed. Quia et laborum libero dolorum hic ipsam. Et culpa quas est tempore corporis est corrupti. Voluptas dolorem perspiciatis consequatur voluptatibus eos.',
  'Dolores repellendus molestias eum veniam expedita ut magni tempora. Architecto omnis est eum voluptatem totam fugit natus esse quasi.',
  'Qui natus nihil incidunt rerum. Aliquid rem sapiente veritatis ratione est.',
  'In eveniet et inventore. Pariatur sint veniam aut cupiditate molestiae. Vel mollitia dolorum fugit provident iure. Suscipit sunt rerum sunt est dolorem ut aperiam facere consequatur. In vel et. Maiores fugiat aliquam.',
  'Dolor id animi ut qui et animi nobis aliquid quod. Aliquid et enim nulla at ea nisi. Aperiam sunt quod corporis voluptatem odio quibusdam eaque. Voluptas quis amet totam consequatur.',
	'Est accusamus et ab est voluptatem voluptas. A earum ut pariatur placeat repellendus. Distinctio autem sit est quia ratione quaerat quos illo.' ]
	
	return sentences[Math.floor(Math.random() * sentences.length)];
}

const randomPrice = () => { //price
	var prices = [ '80.00',
  '848.00',
  '418.00',
  '935.00',
  '765.00',
  '611.00',
  '148.00',
  '233.00',
  '861.00',
  '177.00',
  '443.00',
  '234.00',
  '519.00',
  '243.00',
  '710.00',
  '573.00',
  '135.00',
  '108.00',
  '649.00',
  '126.00' ]
  return prices[Math.floor(Math.random() * prices.length)];
};

const color = () => { //color
	var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
	const color = colors[Math.floor(Math.random() * colors.length)];
	return color;
};


const randomImage = () => { //imageURL 
  const imageList = ['https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(1).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(10).jpeg',
    'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(2).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(3).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(4).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(5).jpeg',
    'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(6).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(7).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(8).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(9).jpeg'];
  const item = imageList[Math.floor(Math.random() * imageList.length)];
  return item;
};

const getRandomRating = () => {
	const list = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]; //rating
	const rand = list[Math.floor(Math.random() * list.length)];
	
  return rand;
};

const randomReviewNumber = () => { //reviewNumber
	return Math.floor((Math.random() * 1000) + 36);
};

const randomBoolean = () => { //randomBoolean
	const bool = [true, false]
	return bool[Math.floor(Math.random() * bool.length)];
  
}; 


var csvWrite = csvWriter({ headers: ["id", "productName", "productDescription", "color", "price", "imageURL", "rating", "reviewNumber", "isPrime"]});
//var fileName = '../fakeData/products2.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 5000001 ; i < 10000001 ; i++) { //generates data points 5MILL.1 to 10MILL.0
	let productObject =  
	[ i ,
	"shirt" + i,
	randomDescription(), 
	color(), 
	randomPrice(),
	randomImage(),
	getRandomRating(),
	randomReviewNumber(),
	randomBoolean()]

		console.log("data entry #", i)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
};


