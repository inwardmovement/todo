<ul>
  <li>task1</li>
  <li>task2</li>
  <li>task3</li>
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    list-style-type: none;
    padding-left: 2rem;
  }

  li:not(:last-child) {
    border-bottom: 1px solid #dee2e6;
  }

  li:hover {
    color: #198754;
  }

  li:hover::before {
    position: absolute;
    top: 0;
    left: 0;
    content: url("/check.svg");
  }
</style>
