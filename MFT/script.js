var memorySize = 0;
var numBlocks = 0;
var blockSize = 0;
var partitions = [];

function initializeMemory() {
  memorySize = parseInt(document.getElementById("memory-size").value);
  numBlocks = parseInt(document.getElementById("num-blocks").value);

  blockSize = memorySize / numBlocks;

  partitions = [];
  for (var i = 0; i < numBlocks; i++) {
    partitions.push({ id: i + 1, size: blockSize, allocated: false });
  }

  updateMemoryView();
}

function addNewProcess() {
  var processSize = parseInt(document.getElementById("process-size").value);
  var allocated = false;
  var allocationMsg = "";

  for (var i = 0; i < partitions.length; i++) {
    var partition = partitions[i];
    if (!partition.allocated && processSize <= partition.size) {
      partition.allocated = true;
      allocated = true;
      allocationMsg = `Process allocated to partition ${partition.id}`;
      break;
    }
  }

  if (!allocated) {
    allocationMsg = "Process cannot be allocated";
  }

  updateMemoryView();
  logAllocation(allocationMsg);
}

function updateMemoryView() {
  var memoryView = document.getElementById("memory");
  memoryView.innerHTML = "";

  for (var i = 0; i < partitions.length; i++) {
    var partition = partitions[i];
    var partitionClass = partition.allocated ? "allocated" : "unallocated";
    memoryView.innerHTML += `<div class="partition ${partitionClass}">${partition.size} KB</div>`;
  }
}

function logAllocation(message) {
  var log = document.getElementById("log");
  log.innerHTML += `<p>${message}</p>`;
  log.scrollTop = log.scrollHeight;
}
